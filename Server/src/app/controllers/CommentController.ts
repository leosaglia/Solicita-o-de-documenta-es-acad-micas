import { Request, Response } from 'express';
import { format } from 'date-fns';

import db from '../../database/connection';

class CommentController {
    async store(request: Request, response: Response) {
        const { description } = request.body;
        const { solicitation_id } = request.params;
        const employee_id = request.userId;
        const comment_date = format(new Date(), 'dd/MM/yyyy');
        
    
        try {
            const employee = await db('academic_secretary')
                .first('employee_login_id')
                .where({ id: employee_id });

            await db('comments').insert({
                description,
                comment_date,
                login_id: employee.employee_login_id,
                solicitation_id
            });
        
            return response.status(201).send();
        } catch (err) {
            return response.status(400).json({
                error: 'Unexpected error while creating new comment.'
             });
        }
        
    }

    async index(request: Request, response: Response) {
        const { solicitation_id } = request.params;

        try {
            const comments = await db('comments')
                .join('academic_secretary', 'comments.login_id', '=', 'academic_secretary.employee_login_id')
                .select(
                    'comments.id', 'comments.description', 'comments.comment_date', 'comments.solicitation_id',
                    'academic_secretary.employee_login_id', 'academic_secretary.employee_name'
                )
                .where({ solicitation_id })
                .orderBy('comments.id', 'desc');

        return response.status(200).json(comments);
        } catch (err) {
            return response.status(400).json({
                error: 'Unexpected error while finding comments.'
             });
        }

    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        await db('comments').delete().where({ id });

        return response.status(204).send();
    }
}

export default new CommentController();
