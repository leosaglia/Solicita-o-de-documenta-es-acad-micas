import React, { useRef, useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { MdComment, MdDateRange, MdPerson } from 'react-icons/md';
import { FormHandles } from '@unform/core';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';

import Menu from '../../../components/Menu';
import Header from '../../../components/Header';

import { Container, CommentItem } from './styles';

interface SolicitationRouteParams {
    solicitationId: string;
}

interface SolicitationData {
    solicitation_id: number;
    solicitation_date: string;
    estimated_completion_date: string;
    status: string;
    priority: boolean;
    document_name: string;
    description: string;
    ra: string;
    name: string;
    email: string;
    course: string;
    period: string;
}

interface CommentData {
    id: number;
    description: string;
    comment_date: string;
    employee_name: string;
}

const SolicitationDetails: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { params } = useRouteMatch<SolicitationRouteParams>();
    const [solicitationDetails, setSolicitationDetails] = useState<SolicitationData[]>([]);
    const [comments, setComments] = useState<CommentData[]>([]);
    const { addToast } = useToast();
    const history = useHistory();

    async function loadComments() {
        try {
            const response = await api.get<CommentData[]>(`comments/${params.solicitationId}`);

            setComments(response.data);
        } catch (err) {
            addToast({
                type: 'error',
                title: 'Erro no servidor',
                description: 'Entre em contato com a equipe de T.I. ou tente novamente mais tarde.',
            });
        }
    }

    useEffect(() => {
        async function loadSolicitationDetails() {
            try {
                const response = await api.get<SolicitationData[]>(`solicitations/${params.solicitationId}`);

                setSolicitationDetails(response.data);
            } catch (err) {
                addToast({
                    type: 'error',
                    title: 'Erro no servidor',
                    description: 'Entre em contato com a equipe de T.I. ou tente novamente mais tarde.',
                });
            }

        }
        
        loadSolicitationDetails();
        loadComments();

    }, [params.solicitationId, formRef]);

    return (
        <>
            <Menu />

            <Container>
                <Header
                    title="Detalhes da solicitação"
                    subTitle="A seguir estão sendo apresentados os detalhes da solicitação escolhida"
                />

                <main>
                    <p className="mb-5">
                        Verifique os detalhes da solicitação escolhida e atualize o <strong>status </strong>
                        ou a <strong>data prevista de conclusão</strong>, no final da página, caso seja conveniente.
                    </p>
                    {solicitationDetails.map(details => (
                        <section key={details.solicitation_id}>
                            <div>
                                <span>Dados do aluno</span>
                                <p><strong>Nome:</strong> {details.name}</p>
                                <p><strong>RA:</strong> {details.ra}</p>
                                <p><strong>Curso:</strong> {details.course}</p>
                                <p><strong>Ciclo:</strong> {details.period}º</p>
                                <p><strong>E-mail:</strong> {details.email}</p>
                            </div>

                            <div>
                                <span>Dados do documento</span>
                                <p><strong>Nome:</strong> {details.document_name}</p>
                                <p><strong>Descrição:</strong> {details.description}</p>
                            </div>

                            <div>
                                <span>Dados da Solicitação</span>
                                <p><strong>Data de criação:</strong> {details.solicitation_date}</p>
                                <p><strong>Data prevista de conclusão:</strong> {details.estimated_completion_date}</p>
                                <p><strong>Status:</strong> {details.status}</p>
                                <p><strong>Prioridade?</strong> {details.priority ? 'Sim' : 'Não'}</p>
                                
                            </div>
                        </section>
                
                    ))}
                </main>

                <section className="comments">
                    <h3>Comentários</h3>
                    <small>Lista de comentários realizadas para esta solicitação</small>
                    <div className="comments-list">
                        {comments.length > 0 ? 
                        (comments.map(comment => (
                            <CommentItem key={comment.id}>
                                <header>
                                    <span><MdPerson size={20} /> {comment.employee_name}</span>
                                    <p><MdDateRange size={20} /> {comment.comment_date}</p>
                                </header>
                                <hr/>
                                <div>
                                    <MdComment size={20}/>
                                    {comment.description}
                                </div>
                            </CommentItem>
                        ))) : 
                        (<p>Não há comentários para esta solicitação.</p>) }

                    </div>
                </section>               
            </Container>
        </>
    );
}

export default SolicitationDetails;