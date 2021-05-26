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

interface EmployeeFormData {
  employee_name: string;
  cpf: string;
  email: string;
  phone: string;
}

const CreateEmployee: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast(); 

  const handleSubmit = useCallback(
    async (data: EmployeeFormData, { reset }) => {
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

        await api.post('employee', data);

        reset();

        addToast({
          type: 'success',
          title: 'Cadastro realizado com sucesso',
          description: 'Este funcionário já pode realizar acesso ao sistema.',
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
                  title="Cadastro de funcionários"
                  subTitle="Cadastre os funcionários informando os dados solicitados" />

              <main className="container">

                  <Form ref={ formRef } onSubmit={handleSubmit}>
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
                      
                      <ButtonPrimarySM>Cadastrar</ButtonPrimarySM>
                  </Form>

              </main>
          </Container>
      </>
  )
}

export default CreateEmployee;