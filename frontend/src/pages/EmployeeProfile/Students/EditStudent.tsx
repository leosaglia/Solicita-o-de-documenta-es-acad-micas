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

interface StudentRouteParams {
  studentId: string;
}

interface StudentFormData {
  ra: string;
  name: string;
  email: string;
  phone: string;
  cellphone: string;
  course: string;
  period: number;
}

const EditStudents: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { params } = useRouteMatch<StudentRouteParams>();
  const { addToast } = useToast();
  const history = useHistory();

  useEffect(() => {
    async function loadStudent() {
      try {
        const response = await api.get(`students/${params.studentId}`);

        formRef.current?.setData({
          ra: response.data[0].ra,
          name: response.data[0].name,
          email: response.data[0].email,
          phone: response.data[0].phone,
          cellphone: response.data[0].cellphone,
          course: response.data[0].course,
          period: response.data[0].period
        });

      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro no servidor',
          description: 'Entre em contato com a equipe de T.I. ou tente novamente mais tarde.',
        });
      }
    }

    loadStudent();

  }, [params.studentId, formRef]);

  const handleEditStudent = useCallback(
    async (data: StudentFormData) => {
      const phoneRegExp = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          ra: Yup.string().required('RA obrigatório'),
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Insira um e-mail válido'),
          phone: Yup.string()
            .matches(phoneRegExp, 'Este número não é válido')
            .required('Telefone obrigatório'),
          course: Yup.string().required('Curso obrigatórios'),
          period: Yup.number()
            .integer('Insira apenas números inteiros')
            .moreThan(0, 'Insira um período válido')
            .required('Período obrigatório')
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put(`students/${params.studentId}`, data);

        addToast({
          type: 'info',
          title: 'Aluno atualizado com sucesso'
        });

        history.push('/alunos/consultar');

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
          title="Edição de alunos"
          subTitle="Edite os campos necessários e depois clique em 'Salvar' para concluir a ação" />

        <main className="container">

          <Form ref={formRef} onSubmit={handleEditStudent}>
            <div className="form-row">
              <div className="form-group col-lg-4">
                <label htmlFor="ra">RA do aluno</label>
                <Input name="ra" placeholder="Informe o RA..." />
              </div>

              <div className="form-group col-lg-8">
                <label htmlFor="name">Nome do aluno</label>
                <Input name="name" placeholder="Informe o nome..." />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-lg-12">
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

            <div className="form-row">
              <div className="form-group col-lg-9">
                <label htmlFor="course">Curso matrículado</label>
                <Input name="course" placeholder="ADS" />
              </div>

              <div className="form-group col-lg-3">
                <label htmlFor="period">Período / Semestre <small>(apenas número)</small></label>
                <Input name="period" placeholder="" type="number" />
              </div>
            </div>

            <ButtonPrimarySM>Salvar</ButtonPrimarySM>
          </Form>

        </main>
      </Container>
    </>
  )
}

export default EditStudents;