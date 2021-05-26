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

interface DocumentRouteParams {
    documentId: string;
}

interface DocumentFormData {
    name: string;
    attendance_deadline: number;
    description: string;
}

const EditDocument: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { params } = useRouteMatch<DocumentRouteParams>();
    const { addToast } = useToast();
    const history = useHistory();

    useEffect(() => {
        async function loadDocument() {
            try {
                const response = await api.get(`documents/${params.documentId}`);

                formRef.current?.setData({
                    name: response.data[0].name,
                    attendance_deadline: response.data[0].attendance_deadline,
                    description: response.data[0].description,
                });

            } catch (err) {
                addToast({
                    type: 'error',
                    title: 'Erro no servidor',
                    description: 'Entre em contato com a equipe de T.I. ou tente novamente mais tarde.',
                });
            }

        }

        loadDocument();

    }, [params.documentId, formRef]);


    const handleEditDocument = useCallback(
        async (data: DocumentFormData) => {

            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    name: Yup.string().required('Nome do documento é obrigatório'),
                    attendance_deadline: Yup.number()
                        .integer('Insira um número válido')
                        .moreThan(0, 'Este não é um prazo válido')
                        .required('Prazo é obrigatório'),
                    description: Yup.string()
                        .required('Descrição obrigatória')
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                await api.put(`documents/${params.documentId}`, data);

                addToast({
                    type: 'info',
                    title: 'Documento atualizado com sucesso'
                });

                history.push('/documentos/consultar');

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
        // [signIn, addToast]
    );

    return (
        <>
            <Menu />

            <Container>
                <Header
                    title="Edição de documentos"
                    subTitle="Edite os campos necessários e depois clique em 'Salvar' para concluir a ação" />

                <main className="container">

                    <Form ref={formRef} onSubmit={handleEditDocument}>
                        <div className="form-row">
                            <div className="form-group col-lg-8">
                                <label htmlFor="name">Nome do documento</label>
                                <Input name="name" placeholder="Informe o nome..." />
                            </div>

                            <div className="form-group col-lg-4">
                                <label htmlFor="attendance_deadline">Prazo de atendimento <small>(em dias)</small></label>
                                <Input name="attendance_deadline" placeholder="Informe o prazo..." type="number" />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-12">
                                <label htmlFor="description">Descrição</label>
                                <Input name="description" placeholder="Informe uma descrição..." />
                            </div>
                        </div>

                        <ButtonPrimarySM>Salvar</ButtonPrimarySM>
                    </Form>

                </main>
            </Container>
        </>
    )
}

export default EditDocument;