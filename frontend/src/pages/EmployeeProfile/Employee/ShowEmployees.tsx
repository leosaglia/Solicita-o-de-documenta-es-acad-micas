import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdPerson, MdMail, MdPhoneAndroid, MdDeleteForever, MdModeEdit } from 'react-icons/md';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';

import Header from '../../../components/Header';
import Menu from '../../../components/Menu';

import { Container, EmployeeList, EmployeeListItem } from './styles';

interface EmployeeData {
    id: number;
    employee_name: string;
    cpf: string;
    email: string;
    phone: string;
}

const ShowEmployees: React.FC = () => {
    const [employees, setEmployees] = useState<EmployeeData[]>([]);
    const { addToast } = useToast();

    useEffect(() => {
        async function loadEmployees() {

            try {
                const response = await api.get<EmployeeData[]>('employee');

                setEmployees(response.data);

            } catch (err) {
                addToast({
                    type: 'error',
                    title: 'Erro no servidor',
                    description: 'Entre em contato com a equipe de T.I. ou tente novamente mais tarde.',
                });
            }

        }

        loadEmployees();
    }, []);

    async function deleteEmployee(id: number) {
        try {
            await api.delete(`employee/${id}`);

            setEmployees(employees.filter(employee => employee.id !== id));

            addToast({
                type: 'info',
                title: 'Funcionário deletado'
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
                description: 'Ocorreu um erro ao deletar o funcionário, atualize a página e tente novamente.',
            });
        }

    }

    return (
        <>
            <Menu />

            <Container>
                <Header
                    title="Consulta de funcionários"
                    subTitle="consulte todos os funcionários cadastrados no sistema" />

                {employees.length <= 0 && (
                    <p className="ml-5 mt-5">Não há funcionários cadastrados...</p>
                )}

                <EmployeeList>
                    {employees.map(employee => (
                        <EmployeeListItem key={employee.id}>
                            <div className="action-buttons">
                                <Link to={`/funcionarios/editar/${employee.id}`} replace>
                                    <MdModeEdit size={22} color="#d09838" />
                                </Link>

                                <button type="button" onClick={() => deleteEmployee(employee.id)}>
                                    <MdDeleteForever size={24} color="#e45527" />
                                </button>
                            </div>
                            <div>
                                <p><MdPerson />{employee.employee_name}</p>
                                <p><strong>CPF</strong> {employee.cpf}</p>
                                <p><MdMail /> {employee.email}</p>
                                <p><MdPhoneAndroid /> {employee.phone}</p>
                            </div>

                        </EmployeeListItem>

                    ))}

                </EmployeeList>
            </Container>
        </>
    )
}

export default ShowEmployees;