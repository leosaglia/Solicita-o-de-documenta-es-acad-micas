import { Request, Response } from 'express';
import { addDays, format } from 'date-fns';

import db from '../../database/connection';

class SolicitationController {
    async store(request: Request, response: Response) {
        const { document_id, priority } = request.body;
        const student_id = request.userId;
        const status = 'criado'

        const solicitation_date = format(new Date(), 'dd/MM/yyyy');
    
        try {
            const document = await db('documents').first().where({ id: document_id });
            const estimated_completion_date = format(addDays(new Date(), document.attendance_deadline), 'dd/MM/yyyy');

            await db('solicitations').insert({
                solicitation_date,
                estimated_completion_date,
                status,
                priority,
                student_id,
                document_id
            });

            return response.status(201).send();
        } catch (err) {
            return response.status(400).json({
                error: 'Unexpected error while creating new solicitation.'
             });
        }
        
    }

    async index(request: Request, response: Response) {
        const { document_name, ra, priority } = request.query;
        let filters = {};

        if (document_name) {
            filters['documents.name'] = document_name;
        } 
        if (ra) {
            filters['students.ra'] = ra;
        }
        if (priority) {
            filters['solicitations.priority'] = priority;
        }

        const solicitations = await db('solicitations')
            .join('students', 'solicitations.student_id', '=', 'students.id')
            .join('documents', 'solicitations.document_id', '=', 'documents.id')
            .select(
                'solicitations.id', 'solicitations.solicitation_date', 
                'solicitations.estimated_completion_date', 'solicitations.status', 'solicitations.student_id',
                'solicitations.priority','students.ra', 'students.name', 'students.course', 'students.period',
                'solicitations.document_id', db.ref('documents.name').as('document_name'), 'documents.description'
                )
            .where(filters)
            .andWhereNot(function() {
                this.where({ status: 'Concluida' }).orWhere({ status: 'Cancelada' })
            })

        return response.status(200).json(solicitations);
    }

    async showFinishedSolicitations(request: Request, response: Response) {
        const { document_name, ra, priority } = request.query;
        let filters = {};

        if (document_name) {
            filters['documents.name'] = document_name;
        } 
        if (ra) {
            filters['students.ra'] = ra;
        }
        if (priority) {
            filters['solicitations.priority'] = priority;
        }

        const solicitations = await db('solicitations')
            .join('students', 'solicitations.student_id', '=', 'students.id')
            .join('documents', 'solicitations.document_id', '=', 'documents.id')
            .select(
                'solicitations.id', 'solicitations.solicitation_date', 'solicitations.conclusion_date',
                'solicitations.estimated_completion_date', 'solicitations.status', 'solicitations.student_id',
                'solicitations.priority','students.ra', 'students.name', 'students.course', 'students.period',
                'solicitations.document_id', db.ref('documents.name').as('document_name'), 'documents.description'
                )
            .where(filters)
            .andWhere({ status: 'Concluida' })

        return response.status(200).json(solicitations);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const solicitation = await db('solicitations')
            .join('students', 'solicitations.student_id', '=', 'students.id')
            .join('documents', 'solicitations.document_id', '=', 'documents.id')
            .select(
                db.ref('solicitations.id').as('solicitation_id'), 'solicitations.solicitation_date',
                'solicitations.estimated_completion_date', 'solicitations.status', 'solicitations.student_id',
                'solicitations.priority','students.ra', 'students.name', 'students.email', 'students.course', 'students.period',
                'solicitations.document_id', db.ref('documents.name').as('document_name'), 'documents.description'
                )
            .where({ solicitation_id: id })

        return response.status(200).json(solicitation);
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { status, estimated_completion_date } = request.body;

        if (status === "Concluida") {
            const conclusion_date = format(new Date(), 'dd/MM/yyyy');

            await db('solicitations').update({ status, estimated_completion_date, conclusion_date }).where({ id });
        } else {
            await db('solicitations').update({ status, estimated_completion_date }).where({ id });
        }

        return response.status(204).send();
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        await db('solicitations').update('status', 'Cancelada').where({ id });

        return response.status(204).send();
    }
}

export default new SolicitationController();
