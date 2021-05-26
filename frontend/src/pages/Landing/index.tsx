import React from 'react';
import { Link } from 'react-router-dom';

import logo_branco from '../../assets/images/logo_branco.svg'
import aluno from '../../assets/images/aluno.svg'
import secretaria_academica from '../../assets/images/secretaria_academica.svg'
import enfeite_documento from '../../assets/images/enfeite_documento.svg'

import { Container, Profiles } from './styles';

const Landing: React.FC = () => {
  return (
    <Container>
        <header>
            <img src={logo_branco} alt="Logo"/>
            <h1>Sistema de solicitação de documentos acadêmicos</h1>
        </header>
        <main>
            <h2>Escolha o <strong>perfil</strong> que se adeque a você e tenha acesso ao sistema.</h2>
            <Profiles>
                <Link to="/secretaria/login">
                    <div>
                        <img src={secretaria_academica} alt="icone que representa a secretária acadêmica"/>
                        <p>Sou da <strong>secretaria acadêmica</strong></p>
                    </div>
                </Link>

                <Link to="/perfil-estudante/login">
                    <div>
                        <img src={aluno} alt="ícone que representa o aluno"/>
                        <p>Sou <strong>aluno(a)</strong></p>
                    </div>
                </Link>
            </Profiles>
        </main>
        <img src={enfeite_documento} alt=""/>
    </Container>
  )
}

export default Landing;