import { Request, Response } from 'express';
import db from '../../database/connection';

class StudentController {
    async store(request: Request, response: Response) {
        let user: String, password: String, ano: Number, type: String;

        const {
            employee_name,
            cpf,
            email,
            phone,
        } = request.body;

        const employeeAlreadyRegistered = await db('academic_secretary').first().where({ email });

        if (employeeAlreadyRegistered) {
            return response.status(400).json({ error: 'Employee already registered' });
        }
    
        ano = new Date().getFullYear();
        user = email;
        password = 'administrador';//employee_name.substring(0, 3) + '@' +  ano;
        type = 'employee';

        const trx = await db.transaction();
    
        try {
            const insertedLoginsId = await trx('logins').insert({
                user,
                password,
                type
            });
        
            const employee_login_id = insertedLoginsId[0];
        
            await trx('academic_secretary').insert({
                employee_name,
                cpf,
                email,
                phone,
                employee_login_id
            });
        
            await trx.commit();

            return response.status(201).send();
        } catch (err) {
            await trx.rollback();

            return response.status(400).json({
                error: 'Unexpected error while creating new employee.'
             });
        }
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const {
            employee_name,
            cpf,
            email,
            phone
        } = request.body;

        await db('academic_secretary').update({employee_name, cpf, email, phone}).where({ id });

        return response.status(204).send();
    }

    async index(request: Request, response: Response) {
        const employees = await db('academic_secretary')
            .select('id', 'employee_name', 'cpf', 'email', 'phone')
            .where({ disabled: null });

        return response.status(200).json(employees);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;
        const employees = await db('academic_secretary')
            .select('id', 'employee_name', 'cpf', 'email', 'phone')
            .where({ disabled: null, id });

        return response.status(200).json(employees);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        await db('academic_secretary').update('disabled', 1).where({ id });

        return response.status(204).send();
    }
}

export default new StudentController();
