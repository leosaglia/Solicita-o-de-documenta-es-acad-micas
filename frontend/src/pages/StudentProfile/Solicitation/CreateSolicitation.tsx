import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import { useToast } from '../../../hooks/toast';

import api from '../../../services/api';

import Menu from '../../../components/Menu';
import Header from '../../../components/Header';
import ButtonPrimarySM from '../../../components/ButtonPrimarySM';

import { Container } from './styles';

interface DocListData {
    id: number;
    name: string;
}

const CreateSolicitation: React.FC = () => {
    const [documentsList, setDocumentsList] = useState<DocListData[]>([]);
    const [documentSelected, setDocumentSelected] = useState(0);
    const [priority, setPriority] = useState(false);
    const { addToast } = useToast(); 
    const history = useHistory();

    useEffect(() => {
        async function loadDocuments() {
            try {
                const response = await api.get<DocListData[]>('/documents');

                setDocumentsList(response.data);
            } catch(err) {
                addToast({
                    type: 'error',
                    title: 'Erro ao carregar documentos',
                    description: 'Atualize a página e tente novamente',
                });
            }
            
        }
        loadDocuments();
    }, []);

    function handleSelectChange(e: any) {
        setDocumentSelected(e.target.value);
    }

    function handleInputChange(e: any) {
        setPriority(e.target.checked);
    }

    async function handleSubmit(e: any) {
        e.preventDefault();

        if (documentSelected != 0) {
            try {
                const token = localStorage.getItem('@SSDA:token');

                await api.post(
                    '/solicitations', 
                    { document_id: documentSelected, priority },
                    { headers: { Authorization: `Bearer ${token}` } }    
                );

                addToast({
                    type: 'success',
                    title: 'Solicitação realizada com sucesso',
                    description: 'Acompanhe o andamento pela tela de consulta de solicitações',
                });

                history.push('/perfil-estudante/solicitacoes-em-aberto');

            } catch(err) {
                addToast({
                    type: 'error',
                    title: 'Erro ao realizar a solicitação',
                    description: 'Atualize a página e tente novamente.',
                });
            }
            
        } else {
            addToast({
                type: 'error',
                title: 'Selecione um documento',
                description: 'O documento deve ser selecionado para prosseguir com a solicitação',
            });
        }   
    }

    return (
        <>
            <Menu />
            <Container>
                <Header
                    title="Solicitação de documentos"
                    subTitle="Realize a solicitação informando os dados necessários" />

                <main className="container">                    
                    <form onSubmit={handleSubmit}>
                        <select value={documentSelected} onChange={handleSelectChange}>
                            <option value="0">Escolha uma opçao...</option>
                            {documentsList.map(document => (
                                <option key={document.id} value={document.id}>{document.name}</option>
                            ))}
                        </select>

                        <div className="mt-4 d-flex align-items-center">
                            <input type="checkbox" name="priority" onChange={handleInputChange} checked={priority} />
                            <label htmlFor="priority" className="mb-0 ml-3">Solicitar com prioridade</label>
                        </div>

                        <ButtonPrimarySM>Solicitar</ButtonPrimarySM>
                    </form>
                </main>
            </Container>
        </>
    );
}

export default CreateSolicitation;