import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { AiOutlineSolution, AiFillCheckCircle } from 'react-icons/ai';
import { IoMdDocument, IoIosPeople } from 'react-icons/io';
import { MdSchool, MdAdd, MdSearch, MdPerson } from 'react-icons/md';
import { FaFileSignature, FaCircleNotch } from 'react-icons/fa';

import { useAuth } from '../../hooks/auth';

import Logo_preto from '../../assets/images/logo_preto.svg';
import { Container, MenuItem, SubMenuItem } from './styles';

const Menu: React.FC = () => {
    const [ studentMenuVisible, setStudentMenuVisible ] = useState(false);
    const [ employeeMenuVisible, setEmployeeMenuVisible ] = useState(false);
    const [ solicitationActive, setSolicitationActive ] = useState(false);
    const [ documentActive, setDocumentActive ] = useState(false);
    const [ studentActive, setStudentActive ] = useState(false);
    const [ employeeActive, setEmployeeActive ] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const type = user.type;

        if (type === "student") {
            setStudentMenuVisible(true);
            setEmployeeMenuVisible(false);
        } else {
            setEmployeeMenuVisible(true);
            setStudentMenuVisible(false);
        }

    }, []);

    const handleActiveItemSolicitation = useCallback(() => {
        setSolicitationActive(!solicitationActive);
    }, [solicitationActive]);
    
    const handleActiveItemDocument = useCallback(() => {
        setDocumentActive(!documentActive);
    }, [documentActive]);

    const handleActiveItemStudent = useCallback(() => {
        setStudentActive(!studentActive);
    }, [studentActive]);

    const handleActiveItemEmployee = useCallback(() => {
        setEmployeeActive(!employeeActive);
    }, [employeeActive]);

    return (
        <Container>
            <section>
                <img src={Logo_preto} alt=""/>
                <h3>Sistema de solicitação de documentos acadêmicos</h3>
                <hr />
            </section>
            <nav>
                <ul>
                    {/*Início menu funcionário*/}
                    <MenuItem active={solicitationActive} visible={employeeMenuVisible}>
                        <div onClick={handleActiveItemSolicitation}>
                            <AiOutlineSolution size={24} />
                            <p>Solicitações</p>                            
                        </div>

                        <SubMenuItem>
                            <li>
                                <Link to="/solicitacoes" replace>
                                    <MdSearch size={20} />
                                    <p>Solicitações em aberto</p>
                                </Link>
                            </li>
                            <li>
                                <Link to="/solicitacoes-concluidas" replace>
                                    <MdSearch size={20} />
                                    <p>Solicitações concluídas</p>
                                </Link>
                            </li>
                        </SubMenuItem>
                    </MenuItem>

                    <MenuItem active={documentActive} onClick={handleActiveItemDocument} visible={employeeMenuVisible}>
                        <div>                            
                            <IoMdDocument size={24} />
                            <p>Documentos</p>
                        </div>

                        <SubMenuItem>
                            <li>
                                <Link to="/documentos/cadastrar" replace>
                                    <MdAdd size={20} />
                                   <p>Cadastrar documentos </p>
                                </Link>
                            </li>
                            <li>
                                <Link to="/documentos/consultar" replace>
                                    <MdSearch size={20} />
                                    <p>Consultar documentos</p>
                                </Link>
                            </li>
                        </SubMenuItem>
                    </MenuItem>
                    
                    <MenuItem active={studentActive} onClick={handleActiveItemStudent} visible={employeeMenuVisible}>
                        <div>
                            <MdSchool size={24} />
                            <p>Alunos</p>
                        </div>

                        <SubMenuItem>
                            <li>
                                <Link to="/alunos/cadastrar" replace>
                                    <MdAdd size={20} />
                                    <p>Cadastrar alunos</p>
                                </Link>
                            </li>
                            <li>
                                <Link to="/alunos/consultar" replace>
                                    <MdSearch size={20} />
                                    <p>Consultar alunos</p>
                                </Link>
                            </li>
                        </SubMenuItem>
                    </MenuItem>

                    <MenuItem active={employeeActive} onClick={handleActiveItemEmployee} visible={employeeMenuVisible}>
                        <div>
                            <IoIosPeople size={24} />
                            <p>Funcionários</p>
                        </div>

                        <SubMenuItem>
                            <li>
                                <Link to="/funcionarios/cadastrar" replace>
                                    <MdAdd size={20} />
                                    <p>Cadastrar funcionários</p>
                                </Link>
                            </li>
                            <li>
                                <Link to="/funcionarios/consultar" replace>
                                    <MdSearch size={20} />
                                    <p>Consultar funcionários</p>
                                </Link>
                            </li>
                        </SubMenuItem>
                    </MenuItem>
                    {/*Fim menu funcionário*/}

                    {/*Início menu aluno*/}
                    <MenuItem active={false} visible={studentMenuVisible}>
                        <Link to="/perfil-estudante/meu-perfil" replace>
                            <div onClick={handleActiveItemSolicitation}>
                                <MdPerson size={24} />
                                <p>Meu perfil</p>                            
                            </div>
                        </Link>
                    </MenuItem>
                    <MenuItem active={false} visible={studentMenuVisible}>
                        <Link to="/perfil-estudante/criar-solicitacao" replace>
                            <div onClick={handleActiveItemSolicitation}>
                                <FaFileSignature size={24} className="ml-2" />
                                <p className="ml-4">Realizar uma nova solicitação</p>                            
                            </div>
                        </Link>
                    </MenuItem>
                    <MenuItem active={false} visible={studentMenuVisible}>
                        <Link to="/perfil-estudante/solicitacoes-em-aberto" replace>
                            <div onClick={handleActiveItemSolicitation}>
                                <FaCircleNotch size={24} />
                                <p>Solicitações em aberto</p>                            
                            </div>
                        </Link>
                    </MenuItem>
                    <MenuItem active={false} visible={studentMenuVisible}>
                        <Link to="/perfil-estudante/solicitacoes-concluidas" replace>
                            <div onClick={handleActiveItemSolicitation}>
                                <AiFillCheckCircle size={24} />
                                <p>Solicitações concluídas</p>                            
                            </div>
                        </Link>
                    </MenuItem>
                    {/*Fim menu aluno*/}
                </ul>
            </nav>
        </Container>
    ); 

}

export default Menu;