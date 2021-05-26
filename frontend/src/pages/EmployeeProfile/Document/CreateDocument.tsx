import React, { useRef, useCallback } from 'react';
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

interface DocumentFormData {
  name: string;
  attendance_deadline: number;
  description: string;
}

const CreateDocument: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast(); 

  const handleSubmit = useCallback(
    async (data: DocumentFormData, { reset }) => {

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

        await api.post('documents', data);

        reset();

        addToast({
          type: 'success',
          title: 'Cadastro realizado com sucesso',
          description: 'Já é possível realizar solicitações para este documento.',
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
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, verifique as informações e tente novamente.',
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
          title="Cadastro de documentos"
          subTitle="Cadastre os documentos informando os dados solicitados" />

        <main className="container">

          <Form ref={formRef} onSubmit={handleSubmit}>
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

            <ButtonPrimarySM>Cadastrar</ButtonPrimarySM>
          </Form>

        </main>
      </Container>
    </>
  )
}

export default CreateDocument;