import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCircle } from 'react-icons/fa';
import { RiAlertFill } from 'react-icons/ri';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';

import Menu from '../../../components/Menu';
import Header from '../../../components/Header';
import ButtonPrimarySM from '../../../components/ButtonPrimarySM';

import { Container, Solicitations, SolicitationItem } from './styles';

interface SolicitationData {
    id: number;
    solicitation_date: string;
    conclusion_date: string;
    estimated_completion_date: string;
    status: string;
    priority: boolean;
    document_name: string;
    description: string;
}

const ShowClosedSolicitations: React.FC = () => {
    const [solicitations, setSolicitations] = useState<SolicitationData[]>([]);
    const { addToast } = useToast();

    useEffect(() => {
        async function loadSolicitations() {
            try {
                const token = localStorage.getItem('@SSDA:token');

                const response = await api.get<SolicitationData[]>(
                    'closed-solicitations',
                    { headers: { Authorization: `Bearer ${token}` } }       
                );

                return setSolicitations(response.data);

            } catch (err) {
                if (!err.status) {
                    addToast({
                        type: 'error',
                        title: 'Erro no servidor',
                        description: 'Entre em contato com a equipe de T.I. ou tente novamente mais tarde.',
                    });

                    return;
                }
            }

        }

        loadSolicitations();
    }, []);

    
    return (
        <>
            <Menu />
            <Container>
                <Header
                    title="Solicitações concluídas"
                    subTitle="Nesta tela são apresentadas todas as solicitações feitas por você e que foram concluídas" />

                {solicitations.length <= 0 && (
                    <p className="ml-5 mt-5">Não há solicitações em concluídas...</p>
                )}
                <Solicitations>
                    {solicitations.map(solicitation => (
                        <SolicitationItem status={solicitation.status} key={solicitation.id} >
                        <header>
                            <p>
                                <FaCircle size={20} />
                                {solicitation.status}
                            </p>
                            {solicitation.priority ? (
                                <span>
                                    <RiAlertFill size={20} />
                                    Com prioridade
                                </span>
                            ) : ''}
                        </header>
                        <strong>Documento solicitado: </strong>
                        <p>{solicitation.document_name}</p>
                        <small>{solicitation.description}</small>
                        <hr/>

                        <strong>Solicitação realizada em:</strong>
                        <p>{solicitation.solicitation_date}</p>

                        <strong>Data prevista para conclusão:</strong>
                        <p>{solicitation.estimated_completion_date}</p>

                        <strong>Data real de conclusão:</strong>
                        <p>{solicitation.conclusion_date}</p>

                        <footer className="mt-4">
                            {/**Anexos? */}
                            <Link to={`/perfil-estudante/solicitacoes/detalhes/${solicitation.id}`} replace>
                                Ver mais detalhes
                            </Link>
                        </footer>
                    </SolicitationItem>

                    ))}
                    

                </Solicitations>
            </Container>
        </>
    );
}

export default ShowClosedSolicitations;