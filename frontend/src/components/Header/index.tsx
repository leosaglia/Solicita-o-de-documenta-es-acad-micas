import React from 'react';
import { FiLogOut } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import { Container } from './styles';

interface HeaderProps {
    title: string;
    subTitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subTitle }) => {
    const { signOut, user } = useAuth();
 
    return (
        <Container>
            <div>
                <h1>{ title }</h1>
                <h2>{ subTitle }</h2>
            </div>

            <div className="d-flex" >
                {user.employee_name ? (
                    <p>
                        Funcionário(a) <strong className="ml-2 mr-2">{user.employee_name}</strong>
                    </p>
                ) : (
                    <p>
                        Aluno(a) <strong className="ml-2 mr-2">{user.name}</strong>
                    </p>
                )}
                
                <button type="button" onClick={signOut}>
                    <FiLogOut size={16} />
                </button>
            </div>
        </Container>
    );
}

export default Header;