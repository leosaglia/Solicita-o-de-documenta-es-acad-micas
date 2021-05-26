import { Request, Response } from 'express';
import { addDays, format } from 'date-fns';

import db from '../../database/connection';

class StudentSolicitationController {
    async store(request: Request, response: Response) {
        const { document_id, priority } = request.body;
        const student_id = request.userId;
        const status = 'Criada'

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

    async showOpenSolicitations(request: Request, response: Response) {
        const student_id = request.userId;

        console.log(student_id);

        const solicitations = await db('solicitations')
            .join('students', 'solicitations.student_id', '=', 'students.id')
            .join('documents', 'solicitations.document_id', '=', 'documents.id')
            .select(
                'solicitations.id', 'solicitations.solicitation_date', 
                'solicitations.estimated_completion_date', 'solicitations.status', 'solicitations.student_id',
                'solicitations.priority','students.ra', 'students.name', 'students.email', 'students.course', 'students.period',
                'solicitations.document_id', db.ref('documents.name').as('document_name'), 'documents.description'
                )
                .where({student_id})
                .andWhereNot(function() {
                    this.where({ status: 'Concluida' }).orWhere({ status: 'Cancelada' })
                })
                .orderBy('solicitation_date')

        console.log(solicitations)

        return response.status(200).json(solicitations);
    }

    async showClosedSolicitations(request: Request, response: Response) {
        const student_id = request.userId;

        console.log(student_id);

        const solicitations = await db('solicitations')
            .join('students', 'solicitations.student_id', '=', 'students.id')
            .join('documents', 'solicitations.document_id', '=', 'documents.id')
            .select(
                'solicitations.id', 'solicitations.solicitation_date', 'solicitations.conclusion_date',
                'solicitations.estimated_completion_date', 'solicitations.status', 'solicitations.student_id',
                'solicitations.priority','students.ra', 'students.name', 'students.email', 'students.course', 'students.period',
                'solicitations.document_id', db.ref('documents.name').as('document_name'), 'documents.description'
                )
                .where({student_id})
                .andWhere({ status: 'Concluida' })
                .orderBy('solicitation_date')

        console.log(solicitations)

        return response.status(200).json(solicitations);
    }
}

export default new StudentSolicitationController();
