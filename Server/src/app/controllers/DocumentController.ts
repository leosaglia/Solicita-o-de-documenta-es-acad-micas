import { Request, Response } from 'express';
import db from '../../database/connection';

class DocumentController {
    async store(request: Request, response: Response) {
        const {
            name,
            description,
            attendance_deadline
        } = request.body;
    
        try {
            await db('documents').insert({
                name,
                description,
                attendance_deadline
            });
        
            return response.status(201).send();
        } catch (err) {
            return response.status(400).json({
                error: 'Unexpected error while creating new document.'
             });
        }
        
    }

    async index(request: Request, response: Response) {
        const documents = await db('documents').select('*');

        return response.status(200).json(documents);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;
        const document = await db('documents').select('*').where({ id });

        return response.status(200).json(document);
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const {
            name,
            description,
            attendance_deadline
        } = request.body;

        await db('documents').update({name, description, attendance_deadline}).where({ id });

        return response.status(204).send();
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        await db('documents').delete().where({ id });

        return response.status(204).send();
    }
}

export default new DocumentController();
