import styled, { css } from 'styled-components';

interface SolicitationItemProps {
    status: string;
}

export const Container = styled.div`
    margin-left: 24rem;

    main {
        padding: 4.8rem;
        overflow: hidden;

        button {
            margin-top: 3.2rem;
            padding: 1.2rem 3.2rem;
        }
    }

    select {
        width: 100%;
        padding: 12px;

        border: 1px solid rgba(75, 88, 94, 0.5);
        border-radius: 8px;

        background: #fff;
        font-size: 1.6rem;
        font-weight: 500;
        color: rgba(75, 88, 94, 1);
    }
    
`;

export const Solicitations = styled.main`
    display: flex;
    flex-wrap: wrap;
    margin-top: 2.4rem;
`;

export const SolicitationItem = styled.section<SolicitationItemProps>`
    position: relative;
    width: 45%;
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

    strong {
        display:block;
        margin-top: 1.6rem;
        font-size: 1.6rem;
        line-height: 2.4rem;
    }

    footer {
        display: flex;
        justify-content: space-between;
        align-items: baseline;

        button.cancel {
            padding: 0.9rem 1.5rem;
            outline: 0;
            border: 1;
            border-color: #c53030;
            font-size: 1.5rem;
            border-radius: 0.8rem;
            color: #c53030;
            background-color: transparent;

            &:hover {
                color: #ef3030;
                background-color: rgba(250,250,250, .5);
                box-shadow: 0 0 2px 1px #c5303044;
            }
        }
    }

    ${(props) =>
        props.status === 'Criada' &&
        css`
            header p {
                color: #9a9a9a;
                background-color: #f8f8f8;
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
