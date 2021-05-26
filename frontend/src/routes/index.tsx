import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Landing from '../pages/Landing';
import Login from '../pages/Login';
import StudentLogin from '../pages/StudentProfile/StudentLogin';

import EmployeeStart from '../pages/EmployeeProfile/EmployeeStart';
import Solicitation from '../pages/EmployeeProfile/Solicitation';
import FinishedSolicitations from '../pages/EmployeeProfile/Solicitation/FinishedSolicitations';
import SolicitationDetails from '../pages/EmployeeProfile/SolicitationDetails';

import CreateStudent from '../pages/EmployeeProfile/Students/CreateStudent';
import ShowStudents from '../pages/EmployeeProfile/Students/ShowStudents';
import EditStudent from '../pages/EmployeeProfile/Students/EditStudent';

import CreateEmployee from '../pages/EmployeeProfile/Employee/CreateEmployee';
import ShowEmployees from '../pages/EmployeeProfile/Employee/ShowEmployees';
import EditEmployee from '../pages/EmployeeProfile/Employee/EditEmployee';

import CreateDocument from '../pages/EmployeeProfile/Document/CreateDocument';
import ShowDocuments from '../pages/EmployeeProfile/Document/ShowDocuments';
import EditDocument from '../pages/EmployeeProfile/Document/EditDocument';

import StudentStart from '../pages/StudentProfile/StudentStart';
import Profile from '../pages/StudentProfile/Profile';
import CreateSolicitation from '../pages/StudentProfile/Solicitation/CreateSolicitation';
import ShowOpenSolicitations from '../pages/StudentProfile/Solicitation/ShowOpenSolicitations';
import ShowClosedSolicitations from '../pages/StudentProfile/Solicitation/ShowClosedSolicitations';
import SolicitationDetailsStudent from '../pages/StudentProfile/SolicitationDetails';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Landing} />      
      <Route path="/secretaria/login" component={Login} />
      <Route path="/perfil-estudante/login" component={StudentLogin} />

      {/* Secretaria */}

      <Route path="/secretaria" exact component={EmployeeStart} isPrivate employeePage />
      <Route path="/solicitacoes" exact component={Solicitation} isPrivate employeePage />
      <Route path="/solicitacoes-concluidas" component={FinishedSolicitations} isPrivate employeePage />
      <Route path="/solicitacoes/detalhes/:solicitationId" component={SolicitationDetails} isPrivate employeePage />

      <Route path="/alunos/cadastrar" component={CreateStudent} isPrivate employeePage />
      <Route path="/alunos/consultar" component={ShowStudents} isPrivate employeePage />
      <Route path="/alunos/editar/:studentId" component={EditStudent} isPrivate employeePage />

      <Route path="/funcionarios/cadastrar" component={CreateEmployee} isPrivate employeePage />
      <Route path="/funcionarios/consultar" component={ShowEmployees} isPrivate employeePage />
      <Route path="/funcionarios/editar/:employeeId" component={EditEmployee} isPrivate employeePage />

      <Route path="/documentos/cadastrar" component={CreateDocument} isPrivate employeePage />
      <Route path="/documentos/consultar" component={ShowDocuments} isPrivate employeePage />
      <Route path="/documentos/editar/:documentId" component={EditDocument} isPrivate employeePage />

      {/* Estutante */}

      <Route path="/perfil-estudante" exact component={StudentStart} isPrivate studentPage />
      <Route path="/perfil-estudante/criar-solicitacao" component={CreateSolicitation} isPrivate studentPage />
      <Route path="/perfil-estudante/solicitacoes-em-aberto" component={ShowOpenSolicitations} isPrivate studentPage />
      <Route path="/perfil-estudante/solicitacoes-concluidas" component={ShowClosedSolicitations} isPrivate studentPage />
      <Route path="/perfil-estudante/meu-perfil" component={Profile} isPrivate studentPage />
      <Route path="/perfil-estudante/solicitacoes/detalhes/:solicitationId" component={SolicitationDetailsStudent} isPrivate studentPage />
    </Switch>
  );
};

export default Routes;
