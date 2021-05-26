import styled from 'styled-components';

export const Container = styled.header`
    display: flex;
    justify-content: space-between;
    position: relative;
    height: 11.2rem;
    padding: 2.4rem 1.6rem 0 4rem;
    background-color: #2F444D;
    color: #FFF;        
    
    h1 {
        font-size: 2.4rem;
        margin-bottom: 1.6rem;
    }

    h2 {
        font-size: 1.6rem;
        font-weight: 400;
    }

    p {
        font-size: 1.4rem;
        font-weight: 300;
    }
    button {
        z-index: 100;
        height: 2rem;
        background: transparent;
        border: 0;
        outline: 0;

        svg {
            color: #c53030;
        }

        &:hover {
            svg {
                color: red;
            }
        }
    }

`;
