import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdDateRange, MdDescription, MdDeleteForever, MdModeEdit } from 'react-icons/md';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';

import Header from '../../../components/Header';
import Menu from '../../../components/Menu';

import { Container, DocumentList, DocumentListItem } from './styles';

interface DocumentData {
    id: number;
    name: string;
    attendance_deadline: number;
    description?: string;
}

const ShowDocuments: React.FC = () => {
    const [documents, setDocuments] = useState<DocumentData[]>([]);
    const { addToast } = useToast(); 

    useEffect(() => {
        async function loadDocuments() {
            try {
                const response = await api.get<DocumentData[]>('documents');

                return setDocuments(response.data);

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

        loadDocuments();
    }, []);

    async function deleteDocument(id:number) {
        try {
            await api.delete(`documents/${id}`);
    
            setDocuments(documents.filter(document => document.id !== id));
    
            addToast({
                type: 'info',
                title: 'Documento deletado'
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
            description: 'Ocorreu um erro ao deletar o documento, atualize a página e tente novamente.',
            });

        }
    }

    return (
        <>
            <Menu />

            <Container>
                <Header
                    title="Consulta de documentos"
                    subTitle="consulte todos os documentos cadastrados no sistema" />

                {documents.length <= 0 && (
                    <p className="ml-5 mt-5">Não há documentos cadastrados...</p>
                )}

                <DocumentList>

                    {documents.map(document => (
                        <DocumentListItem key={document.id}>
                            <div className="action-buttons">
                                <Link to={`/documentos/editar/${document.id}`} replace>
                                    <MdModeEdit size={22} color="#d09838" />
                                </Link>

                                <button type="button" onClick={() => deleteDocument(document.id)}>
                                    <MdDeleteForever size={24} color="#e45527" />
                                </button>
                            </div>
                            <div className="row">
                                <p className="col-7"><MdDescription />{document.name}</p>

                                <p className="col-5">
                                    <MdDateRange />
                                    Prazo de  {document.attendance_deadline} dias 
                                    <small className="ml-1">(atendimento)</small>
                                </p>
                            </div>
                            <hr />
                            <div className="row mt-3">
                                <p className="col-12">
                                    <span>{document.description}</span>
                                </p>
                            </div>
                        </DocumentListItem>
                    ))}
                </DocumentList>
            </Container>
        </>
    )
}

export default ShowDocuments;