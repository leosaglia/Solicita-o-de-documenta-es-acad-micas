import React, { useEffect, useRef, useCallback } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';

import getValidationErrors from '../../../utils/getValidationErrors';

import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import ButtonPrimarySM from '../../../components/ButtonPrimarySM';

import Input from '../../../components/Input';

import { Container } from './styles';

interface EmployeeRouteParams {
    employeeId: string;
}

interface EmployeeFormData {
    employee_name: string;
    cpf: string;
    email: string;
    phone: string;
}

const EditEmployee: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { params } = useRouteMatch<EmployeeRouteParams>();
    const { addToast } = useToast();
    const history = useHistory();

    useEffect(() => {
        async function loadEmployee() {
            try {
                const response = await api.get(`employee/${params.employeeId}`);

                formRef.current?.setData({
                    employee_name: response.data[0].employee_name,
                    cpf: response.data[0].cpf,
                    email: response.data[0].email,
                    phone: response.data[0].phone
                });
            } catch (err) {
                addToast({
                    type: 'error',
                    title: 'Erro no servidor',
                    description: 'Entre em contato com a equipe de T.I. ou tente novamente mais tarde.',
                });

            }

        }

        loadEmployee();

    }, [params.employeeId, formRef]);

    const handleEditEmployee = useCallback(
        async (data: EmployeeFormData) => {
            const phoneRegExp = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/
            const cpfReg = /^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$/

            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    employee_name: Yup.string().required('Nome obrigatório'),
                    cpf: Yup.string()
                        .matches(cpfReg, 'Insira um CPF válido')
                        .required('CPF obrigatório'),
                    email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('Insira um e-mail válido'),
                    phone: Yup.string()
                        .matches(phoneRegExp, 'Este número não é válido')
                        .required('Telefone obrigatório')
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                await api.put(`employee/${params.employeeId}`, data);

                addToast({
                    type: 'info',
                    title: 'Funcionário atualizado com sucesso'
                });

                history.push('/funcionarios/consultar');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);

                    formRef.current?.setErrors(errors);

                    return;
                }

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
                    title: 'Erro no atualização',
                    description: 'Ocorreu um erro ao atualizar o cadastro, verifique as informações e tente novamente.',
                });
            }
        },
        [addToast]
    );

    return (
        <>
            <Menu />

            <Container>
                <Header
                    title="Edição de funcionários"
                    subTitle="Edite os campos necessários e depois clique em 'Salvar' para concluir a ação" />

                <main className="container">

                    <Form ref={formRef} onSubmit={handleEditEmployee}>
                        <div className="form-row">
                            <div className="form-group col-lg-8">
                                <label htmlFor="employee_name">Nome do funcionário</label>
                                <Input name="employee_name" placeholder="Informe o nome..." />
                            </div>

                            <div className="form-group col-lg-4">
                                <label htmlFor="cpf">CPF do funcionário</label>
                                <Input name="cpf" placeholder="Informe o CPF..." />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-lg-7">
                                <label htmlFor="email">E-mail do funcionário</label>
                                <Input name="email" placeholder="Informe o e-mail..." />
                            </div>

                            <div className="form-group col-lg-5">
                                <label htmlFor="phone">Telefone do funcionário</label>
                                <Input name="phone" placeholder="Informe o telefone..." />
                            </div>
                        </div>

                        <ButtonPrimarySM>Salvar</ButtonPrimarySM>
                    </Form>

                </main>
            </Container>
        </>
    )
}

export default EditEmployee;