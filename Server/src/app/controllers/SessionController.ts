import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import db from '../../database/connection';

class SessionController {
    async store(request: Request, response: Response) {
        const { user, password, type } = request.body;

        const userExists = await db('logins').first().where({ user, type });

        if (!userExists) {
            return response.status(401).json({ error: 'User not found' });
        }

        if (userExists.password !== password) {
            return response.status(401).json({ error: 'Password does not match' });
        }

        if (type === 'student') {
            const student = await db('students').first().where({ student_login_id: userExists.id });
            const { id, ra, name } = student;

            return response.json({
                user: {
                    id, 
                    name
                },
                token: jwt.sign({ id }, authConfig.secret, {
                    expiresIn: authConfig.expiresIn
                }) 
            })
            
        } else {
            const employee = await db('academic_secretary')
                .first()
                .where({ employee_login_id: userExists.id });

            const { id, employee_name } = employee;

            return response.json({
                user: {
                    id, 
                    employee_name 
                },
                token: jwt.sign({ id }, authConfig.secret, {
                    expiresIn: authConfig.expiresIn
                }) 
            })
        }
    }
}

export default new SessionController();
