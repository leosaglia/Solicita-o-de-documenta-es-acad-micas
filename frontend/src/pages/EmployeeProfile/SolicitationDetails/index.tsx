import React, { useRef, useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { MdComment, MdDateRange, MdPerson, MdDeleteForever, MdEdit, MdClose } from 'react-icons/md';
import { format } from 'date-fns';
import InputMask from 'react-input-mask';
import { FormHandles } from '@unform/core';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';

import Menu from '../../../components/Menu';
import Header from '../../../components/Header';

import { Container, CommentItem, UpdateSolicitationArea } from './styles';

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
    const [statusSelected, setStatusSelected] = useState("");
    const [estimatedDate, setEstimatedDate] = useState("");
    const [solicitationComment, setSolicitationComment] = useState("");
    const [comments, setComments] = useState<CommentData[]>([]);
    const [updateSolicitationVisible, setUpdateSolicitationVisible] = useState(false);
    const { addToast } = useToast();

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

    function handleSelectChange(e: any) {
        setStatusSelected(e.target.value);
    }

    async function handleUpdateEstimatedDate() {
        let aux = estimatedDate.split('/');
        const date2Compare = `${aux[1]}/${aux[0]}/${aux[2]}`;
        const validDate = new Date(date2Compare).toString();

        if (validDate == 'Invalid Date')
        {
            addToast({
                type: 'error',
                title: 'Data prevista de conclusão',
                description: 'Esta não é uma data válida',
            });

            return;
        }

        if (date2Compare >= format(new Date(), 'MM/dd/yyyy')) {
            try {
                await api.put(`/solicitations/${params.solicitationId}`, {
                    estimated_completion_date: estimatedDate
                });
    
                solicitationDetails[0].estimated_completion_date = estimatedDate;
    
                addToast({
                    type: 'success',
                    title: 'Atualização de data',
                    description: 'Data prevista de conclusão atualizada com sucesso.',
                });

                setEstimatedDate('');
            } catch (err) {
                addToast({
                    type: 'error',
                    title: 'Erro no servidor',
                    description: 'Entre em contato com a equipe de T.I. ou tente novamente mais tarde.',
                });
            }
            

        } else {
            addToast({
                type: 'error',
                title: 'Data prevista de conclusão',
                description: 'Não é permitido atualizar para uma data inferior a de hoje.',
            });
        }
    }

    async function handleUpdateStatus() {
        if (statusSelected == '') {
            addToast({
                type: 'error',
                title: 'Status',
                description: 'É necessário escolher um status para que ocorra a atualização',
            });

            return;
        }

        try {
            await api.put(`/solicitations/${params.solicitationId}`, {
                status: statusSelected
            });

            solicitationDetails[0].status = statusSelected;

            addToast({
                type: 'success',
                title: 'Atualização de status',
                description: 'Status atualizado com sucesso.',
            });

            setStatusSelected('');
        } catch (err) {
            addToast({
                type: 'error',
                title: 'Erro no servidor',
                description: 'Entre em contato com a equipe de T.I. ou tente novamente mais tarde.',
            });
        }
    }

    async function handleCommentChange(e: any) {
        setSolicitationComment(e.target.value);
    }

    async function createComment() {
        if (solicitationComment === '') {
            addToast({
                type: 'error',
                title: 'Comentário',
                description: 'É necessário escrever algo para adicionar um comentário.',
            });

            return;
        }   

        try {
            const token = localStorage.getItem('@SSDA:token');

            await api.post(`comments/${params.solicitationId}`, 
                { description: solicitationComment },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            addToast({
                type: 'success',
                title: 'Comentário',
                description: 'Novo comentário adicionado com sucesso.',
            });

            setSolicitationComment('');

            loadComments();

        } catch(err) {
            addToast({
                type: 'error',
                title: 'Erro no servidor',
                description: 'Entre em contato com a equipe de T.I. ou tente novamente mais tarde.',
            });
        }
    }

    async function deleteComment(id: number) {
        try {
            await api.delete(`comments/${id}`);

            setComments(comments.filter(comment => comment.id !== id));

            addToast({
                type: 'info',
                title: 'Comentário deletado'
            });
        } catch (err) {
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
                title: 'Erro ao deletar',
                description: 'Ocorreu um erro ao deletar o comentário, atualize a página e tente novamente.',
            });
        }

    }

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
                                <UpdateSolicitationArea>
                                    <button type="button" onClick={() => setUpdateSolicitationVisible(true)}>
                                        <MdEdit size={20} color="#d09838"  />
                                        Atualizar solicitação
                                    </button>
                                    <hr className="mt-5" hidden={!updateSolicitationVisible} />
                                    <footer className="mt-5 pb-2" hidden={!updateSolicitationVisible} >
                                        <button type="button" className="closebtn" onClick={() => setUpdateSolicitationVisible(false)}>
                                            <MdClose size={20} color="#ff0000"  />
                                            Fechar
                                        </button>
                                        <div className="dflex">
                                            <div className="dcolumn">
                                                <label>Status da solicitação</label>

                                                <select value={statusSelected} onChange={handleSelectChange} name="status">
                                                    <option value="">Escolha o status...</option>

                                                    {solicitationDetails[0].status !== 'Concluida' ? 
                                                    (
                                                    <>
                                                        <option value="Em andamento">Em andamento</option>
                                                        <option value="Concluida">Concluída</option>
                                                    </>
                                                    ) : (
                                                        <option value="Criada">Criada</option>
                                                    )}
                                                    
                                                </select>
                                            </div>

                                            <button type="button" onClick={handleUpdateStatus}>Atualizar Status</button>
                                        </div>
                                        <div className="dflex mt-4">
                                            <div className="dcolumn">
                                                <label>Data prevista de conclusão</label>
                                                <InputMask 
                                                    mask="99/99/9999" 
                                                    placeholder="__/__/____" 
                                                    value={estimatedDate}
                                                    onChange={(e) => setEstimatedDate(e.target.value)}
                                                />
                                            </div>
                                            <button type="button" onClick={handleUpdateEstimatedDate} >Atualizar data</button>
                                        </div>
                                    </footer>
                                </UpdateSolicitationArea>
                            </div>
                        </section>
                
                    ))}
                </main>

                <section className="comments">
                    <div>
                        <strong>Insira um comentário</strong>
                        <textarea 
                            id="commentText" 
                            onChange={handleCommentChange}
                            value={solicitationComment} 
                            rows={3} 
                            placeholder="Seu comentário aqui..." 
                        />
                        <button type="button" className="ml-0 mt-4" onClick={() => createComment()}>
                            Comentar
                        </button>
                    </div>
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
                                <button type="button" onClick={() => deleteComment(comment.id)}>
                                    <MdDeleteForever size={24} color="#e45527" />
                                </button>
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