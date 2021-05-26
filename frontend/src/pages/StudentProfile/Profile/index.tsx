import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import profileIMG from '../../../assets/images/profile.png';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';

import getValidationErrors from '../../../utils/getValidationErrors';

import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import ButtonPrimarySM from '../../../components/ButtonPrimarySM';

import Input from '../../../components/Input';

import { Container } from './styles';

interface StudentFormData {
    ra: string;
    name: string;
    email: string;
    phone: string;
    cellphone: string;
    course: string;
    period: number;
}

const Profile: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const [student, setStudent] = useState<StudentFormData[]>([]); 
    const { addToast } = useToast();
    const history = useHistory();

    useEffect(() => {
        async function loadStudent() {
            try {
                const token = localStorage.getItem('@SSDA:token');

                const response = await api.get<StudentFormData[]>(
                    'student-profile',
                    { headers: { Authorization: `Bearer ${token}` } } 
                );

                formRef.current?.setData({
                    name: response.data[0].name,
                    email: response.data[0].email,
                    phone: response.data[0].phone,
                    cellphone: response.data[0].cellphone,
                });

                setStudent(response.data);
            } catch (err) {
                addToast({
                    type: 'error',
                    title: 'Erro no servidor',
                    description: 'Entre em contato com a equipe de T.I. ou tente novamente mais tarde.',
                });
            }
        }

        loadStudent();

    }, [formRef]);

    const handleEditStudent = useCallback(
        async (data: StudentFormData) => {
            const phoneRegExp = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/
            const token = localStorage.getItem('@SSDA:token');

            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    name: Yup.string().required('Nome obrigatório'),
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

                await api.patch(
                    'student-profile',
                    data,
                    { headers: { Authorization: `Bearer ${token}` } } 
                );

                addToast({
                    type: 'success',
                    title: 'Perfil atualizado com sucesso'
                });

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
                <div className="imgProfile">
                    <img src={profileIMG} alt="profile"/>   
                </div> 

                <Header
                    title=""
                    subTitle="" />

                 

                <main className="container">
                    <h1 className="text-center">Meu Perfil</h1> 
                    <hr />
                    <Form ref={formRef} onSubmit={handleEditStudent}>
                        <div className="form-row">
                            <div className="form-group col-lg-7">
                                <label htmlFor="name">Nome do aluno</label>
                                <Input name="name" placeholder="Informe o nome..." />
                            </div>

                            <div className="form-group col-lg-5">
                                <label htmlFor="email">E-mail do aluno</label>
                                <Input name="email" placeholder="Informe o e-mail..." />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-lg-6">
                                <label htmlFor="phone">Telefone do aluno</label>
                                <Input name="phone" placeholder="Informe o telefone..." />
                            </div>

                            <div className="form-group col-lg-6">
                                <label htmlFor="cellphone">Celular do aluno</label>
                                <Input name="cellphone" placeholder="Informe o celular..." />
                            </div>
                        </div>

                        <ButtonPrimarySM>Salvar</ButtonPrimarySM>
                    </Form>

                    <h3>Demais informações:</h3>
                    
                    {student.map(s => (
                        <div key={s.ra}>
                            <p><strong>RA:</strong> {s.ra}</p>
                            <p><strong>Curso:</strong> {s.course}</p>
                            <p><strong>Semestre:</strong> {s.period}º</p>
                        </div>
                        
                    ))}
                </main>
            </Container>
        </>
    )
}

export default Profile;