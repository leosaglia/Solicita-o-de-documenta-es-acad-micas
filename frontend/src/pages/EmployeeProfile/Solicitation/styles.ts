import styled, { css } from 'styled-components';

interface SolicitationItemProps {
    status: string;
}

export const Container = styled.div`
    margin-left: 24rem;

    section.filter-area {  
        display: flex;
        justify-content: center;
        align-items: center;      
        padding: 1.6rem 0rem;
        background-color: rgba(240, 240, 240, .6);
    }

    form {
        display: flex;
        justify-content: center;
        align-items: flex-end;     

        select {
            width: 100%;
            padding: 11px;
            padding-right: 0;

            border: 1px solid rgba(75, 88, 94, 0.5);
            border-radius: 8px;

            background: #fff;
            font-size: 1.6rem;
            font-weight: 400;
            color: rgba(75, 88, 94, 1);
        } 

        div + div {
            margin-left: 4rem;
        }

        button {
            display: flex;
            align-items: center;
            justify-content: space-between;

            margin-left: 4rem;
            padding: 1rem 1.6rem;

            outline: 0;
            border: 0;
            font-size: 1.5rem;
            border-radius: 0.8rem;
            color: #FFF;
            background-color: #4B585E;

            svg {
                margin-right: 0.8rem;
            }

            &:hover {
                background-color: #404f54;
                box-shadow: 0 0 3px 1px #404F5444;
            }
        }
    }

    div.ordenacao {
        width: 90%;
        margin: 0 auto;
        margin-top: 2rem;
        text-align: right;
    }

    select {
        padding: 6px 8px;

        border: 1px solid rgba(75, 88, 94, 0.5);
        border-radius: 8px;

        color: rgba(75, 88, 94, 1);
        background: #fff;

        font-size: 1.4rem;

    }

    label {
            margin-right: 0.8rem;
            font-size: 1.4rem;
            font-weight: 400;
    }
    
`;

export const Solicitations = styled.main`
    margin-top: 2.4rem;
    padding-bottom: 2.4rem;
`;

export const SolicitationItem = styled.section<SolicitationItemProps>`
    width: 90%;
    margin: 0 auto;
    margin-bottom: 2.4rem;
    padding: 1.6rem;
    border-radius: 0.8rem;
    box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.1);
    background-color: #FFF;
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 2.1rem;

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.6rem;

        p, span {
            display: flex;
            align-items: center;
            padding: 0.4rem;
            border-radius: 0.4rem;

            svg {
                margin-right: 0.8rem;
            }
        }

        p {
            font-weight: 600;
        }

        span {
            background-color: #fff3cd;
            color: #856404;
        }
    }

    > strong {
        display: block;
        font-size: 1.6rem;
        font-weight: 700;
        line-height: 2.4rem;
        color: #2F444D;
        margin-top: 1rem;
    }

    footer {
        margin-top: 1.6rem;
    }

    ${(props) =>
        props.status === 'Criada' &&
        css`
            header p {
                color: #9a9a9a;
                background-color: #fefefe;
            }
        `
    }

    ${(props) =>
        props.status === 'Em andamento' &&
        css`
            header p {
                color: #0c5460;
                background-color: #d1ecf1;
            }
        `
    }

    ${(props) =>
        props.status === 'Concluida' &&
        css`
            header p {
                color: #155724;
                background-color: #d4edda;
            }
        `
    }
`;
