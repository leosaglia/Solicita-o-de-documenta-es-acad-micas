import React, { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MdPerson, MdVpnKey } from 'react-icons/md'
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useAuth } from '../../../hooks/auth';
import { useToast } from '../../../hooks/toast';

import getValidationErrors from '../../../utils/getValidationErrors';

import aluno_branco from '../../../assets/images/aluno_branco.svg'

import Input from '../../../components/Input';

import { Box, Container } from './styles';

interface LoginFormData {
  user: string;
  password: string;
}

const StudentLogin: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: LoginFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          user: Yup.string().required('Usuário obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.user,
          password: data.password,
          type: 'student'
        });

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      }
    },
    [signIn, addToast]
  );

  return (
      <Container>
          <Box>
              <aside>
                <h1>Bem Vindo!</h1>
                <h2>Acesse o sistema como</h2>
                <img src={aluno_branco} alt=""/>
                <strong>Aluno</strong>
                <p>Acessar com um perfil diferente, <Link to="/">voltar a página inicial</Link></p>
              </aside>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>ENTRAR</h1>

                <label htmlFor="user">Usuário</label>
                <Input name="user" icon={MdPerson} placeholder="Informe seu usuário" />
                <label htmlFor="password">Senha</label>
                <Input type="password" name="password" icon={MdVpnKey} placeholder="Informe sua senha" />

                <button type="submit">Iniciar Sessão</button>
              </Form>  
          </Box>
      </Container>
  )
}

export default StudentLogin;
