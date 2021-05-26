import styled from 'styled-components';

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
`;

export const StudentList = styled.section`
    margin: 3.2rem;
`;

export const StudentListItem = styled.section`
    position: relative;
    width: 80%;
    margin: 0 auto;
    margin-bottom: 2.4rem;
    padding: 3.2rem;
    background-color: #FFF;
    box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.2);
    border-radius: 0.8rem;

    .action-buttons {
        display: flex;
        align-items: center;
        position: absolute;
        right: 0.8rem;
        top: 0.8rem;

        button {
            background: transparent;
            border-radius: 0.8rem;
            padding: 0.2rem;
            border: 0;
            outline: 0;

            &:hover {
                background-color: rgba(190, 190, 190, 0.2);
            } 
        }

        > a{
            border-radius: 0.8rem;
            padding: 0.2rem;
            margin-right: 0.8rem;

            &:hover {
                background-color: rgba(190, 190, 190, 0.2);
            }
        }

        button + button {
            margin-left: .8rem;
        }
    }

    p {
        display: flex;
        align-items: center;
        font-weight: 400;

        strong {
            margin-right: 0.8rem;
        }

        svg {
            margin-right: 1.6rem;
        }
    }
`;