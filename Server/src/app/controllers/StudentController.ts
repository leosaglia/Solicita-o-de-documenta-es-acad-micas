import { Request, Response } from 'express';
import db from '../../database/connection';
import Mail from '../../services/mail';

class StudentController {

    async store(request: Request, response: Response) {
        let message = '';
        let user: String, password: String, ano: Number, type: String;

        const {
            ra,
            name,
            email,
            phone,
            cellphone,
            course,
            period
        } = request.body;

        const studentAlreadyRegistered = await db('students').first().where({ ra });

        if (studentAlreadyRegistered) {
            return response.status(400).json({ error: 'Student already registered' });
        }
    
        ano = new Date().getFullYear();
        user = email;
        password = ra + 'SP';
        type = 'student'
    
        const trx = await db.transaction();

       try {
        const insertedLoginsId = await trx('logins').insert({
            user,
            password,
            type
        });
    
        const student_login_id = insertedLoginsId[0];
    
        await trx('students').insert({
            ra,
            name,
            email,
            phone,
            cellphone,
            course,
            period,
            student_login_id
        });

        await trx.commit();

        message = `
            Caro <strong> ${name}</strong>, <br/> <br/>
            <p>Você acaba de ser registrado no sistema de solicitações de documentações acadêmicas.</p>
            <p>Acesse o sistema através do link <a href="http://localhost:3000/">Clique aqui</a></p><br/>
            <p>Suas credênciais para acesso são:</p>
            <p><strong>usuário:</strong> ${user}</p>
            <p><strong>senha</strong> ${password}</p></br></br>
            <p>Atenciosamente,</p>
            <p>Secretaria acadêmica</p>
        `;
        Mail.sendMail(email, 'Usuário criado para solicitação de documentos acadêmicos', message);

        return response.status(201).send();
       } catch (err) {
            await trx.rollback();

            return response.status(400).json({
               error: 'Unexpected error while creating new student'
            });
       }
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const {
            ra,
            name,
            email,
            phone,
            cellphone,
            course,
            period
        } = request.body;

        await db('students').update({
            ra,
            name,
            email,
            phone,
            cellphone,
            course,
            period
        }).where({ id });

        return response.status(204).send();
    }

    async getProfile(request: Request, response: Response) {
        const student_id = request.userId;

        const students = await db('students')
            .select('id', 'ra', 'name', 'email', 'phone', 'cellphone', 'course', 'period')
            .where({ id: student_id });

        return response.status(200).json(students);
    }

    async updateProfile(request: Request, response: Response) {
        const student_id = request.userId;

        const {
            name,
            email,
            phone,
            cellphone
        } = request.body;

        await db('students').update({
            name,
            email,
            phone,
            cellphone
        }).where({ id: student_id });

        return response.status(204).send();
    }

    async index(request: Request, response: Response) {
        const students = await db('students')
            .select('id', 'ra', 'name', 'email', 'phone', 'cellphone', 'course', 'period')
            .where({ disabled: null });

        return response.status(200).json(students);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;
        const students = await db('students')
            .select('id', 'ra', 'name', 'email', 'phone', 'cellphone', 'course', 'period')
            .where({ disabled: null, id });

        return response.status(200).json(students);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        await db('students').update('disabled', 1).where({ id });

        return response.status(204).send();
    }
}

export default new StudentController();
