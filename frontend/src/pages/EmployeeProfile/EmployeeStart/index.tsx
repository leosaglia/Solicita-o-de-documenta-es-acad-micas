import React from 'react';

import Menu from '../../../components/Menu';
import Header from '../../../components/Header';

import { Container } from './styles';

const EmployeeStart: React.FC = () => {
  return (
    <>
      <Menu />

      <Container>
        <Header 
        title="Sistema de solicitações de documentações acadêmicas" 
        subTitle="Instruções iniciais" />

        <main>
          <h1>Bem vindo!</h1>
          <h2>Você está acessando o sistema de solicitações de documentações acadêmicas.</h2>
          <hr/>
          <p>
            Navegue através das opções listadas no menu lateral.
          </p>
          <hr/>
          <p>
            Para facilitar a navegação do sistema e a sua usabilidade, cada página acessada terá
            um cabeçalho informando qual conteúdo aquela página representa.
          </p>
          <hr/>
          <p>
            Alguns locais a serem acessados, dependerão de algumas informações, e você somente 
            precisará informa-lás conforme estiver descrito.
          </p>
        </main>
      </Container>
    </>
  );
}

export default EmployeeStart;