import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdPerson, MdMail, MdPhone, MdPhoneAndroid, MdDeleteForever, MdModeEdit } from 'react-icons/md';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';

import Header from '../../../components/Header';
import Menu from '../../../components/Menu';

import { Container, StudentList, StudentListItem } from './styles';

interface StudentData {
    id: number;
    ra: string;
    name: string;
    email: string;
    phone: string;
    cellphone: string;
    course: string;
    period: number;
}

const ShowStudents: React.FC = () => {
    const [students, setStudents] = useState<StudentData[]>([]);
    const { addToast } = useToast();

    useEffect(() => {
        async function loadStudents() {
            try {
                const response = await api.get<StudentData[]>('students');

                setStudents(response.data);

            } catch (err) {
                addToast({
                    type: 'error',
                    title: 'Erro no servidor',
                    description: 'Entre em contato com a equipe de T.I. ou tente novamente mais tarde.',
                });
            }
        }

        loadStudents();
    }, []);

    async function deleteStudent(id: number) {
        try {
            await api.delete(`students/${id}`);

            setStudents(students.filter(student => student.id !== id));

            addToast({
                type: 'info',
                title: 'Aluno deletado'
            });
        } catch (err) {
            if (!err.status) {
                addToast({
                    type: 'error',
                    title: 'Erro no servidor',
                    description: 'Entre em contato com a equipe de T.I. ou tente novamente mais tarde.',
                });

                return;
            }

            addToast({
                type: 'error',
                title: 'Erro ao deletar',
                description: 'Ocorreu um erro ao deletar o aluno, atualize a página e tente novamente.',
            });
        }
    }

    return (
        <>
            <Menu />

            <Container>
                <Header
                    title="Consulta de alunos"
                    subTitle="consulte todos os alunos cadastrados no sistema" />

                {students.length <= 0 && (
                    <p className="ml-5 mt-5">Não há alunos cadastrados...</p>
                )}
                <StudentList>

                    {students.map(student => (

                        <StudentListItem key={student.id}>
                            <div className="action-buttons">

                                <Link to={`/alunos/editar/${student.id}`} replace>
                                    <MdModeEdit size={22} color="#d09838" />
                                </Link>

                                <button type="button" onClick={() => deleteStudent(student.id)}>
                                    <MdDeleteForever size={24} color="#e45527" />
                                </button>
                            </div>
                            <div className="row">
                                <p className="col-8"><MdPerson />{student.name}</p>

                                <p className="col-4"><strong>RA:</strong> {student.ra}</p>
                            </div>
                            <div className="row mt-3">
                                <p className="col-8"><MdMail /> {student.email}</p>
                                <p className="col-4"><MdPhoneAndroid /> {student.cellphone || '---'}</p>
                            </div>

                            <div className="row my-3">
                                <p className="col-12"><MdPhone /> {student.phone}</p>
                            </div>
                            <hr />
                            <div className="row mt-3">
                                <p className="col-8"><strong>Curso: </strong> {student.course}</p>
                                <p className="col-4"><strong>Período: </strong> {student.period}</p>
                            </div>

                        </StudentListItem>
                    ))}


                </StudentList>
            </Container>
        </>
    )
}

export default ShowStudents;