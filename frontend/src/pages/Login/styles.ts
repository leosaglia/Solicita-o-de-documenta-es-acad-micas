import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Box = styled.div`
    background: #232F34;
    width: 92.8rem;
    height: 37.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    aside {
        flex: 1;
        display: flex;
        flex-direction: column;
        color: #fff;
        height: 37.6rem;
        margin-top: 4.8rem;
        margin-left: 3.2rem;

        h1 {
            font-weight: 800;
            font-size: 2.4rem;
        }

        h2 {
            margin-top: 2.4rem;
            font-weight: 400;
            font-size: 1.6rem;
        }
        
        img {
            width: 14rem;
            margin-top: 3.6rem;
            align-self: center;
        }
        
        strong {
            align-self: center;
            margin-top: 0.8rem;
            font-size: 2rem;
        }

        p {
            margin-top: 2.4rem;
            font-weight: 400;
            font-size: 1.6rem;

            a {
                cursor: pointer;
                text-decoration: underline;
                color: #7D91FF;
                font-weight: 400;

                &:hover {
                    color: #3F91FF;
                }
            }
        }
    }

    form {
        width: 44.8rem;
        height: 44.8rem;
        margin-right: 3.2rem;
        padding: 6rem;
        background-color: #FFF;
        box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.2);
        color: #4B585E;

        h1 {
            font-size: 2.4rem;
            font-weight:600;
            margin-bottom: 3.2rem;
        }

        label {
            display: block;
            margin: 2.4rem 0 1.4rem 0;
            font-weight: 600;
            font-size: 1.6rem;
        }

        button {
            display: block;
            padding: 1.2rem 5.4rem;
            border: 0;
            outline: 0;
            border-radius: 0.8rem;
            color: #FFF;
            font-size: 1.6rem;
            background-color: #4B585E;
            margin: 4rem auto 0 auto;

            &:hover {
                background-color: #404f54;
                box-shadow: 0 0 4px 1px #404F5488;
            }
        }
    }
`;

export const LoginForm = styled.div`
    width: 44.8rem;
    height: 44.8rem;
    margin-right: 4.8rem;
    background-color: #FFF;
    box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.2);
`;