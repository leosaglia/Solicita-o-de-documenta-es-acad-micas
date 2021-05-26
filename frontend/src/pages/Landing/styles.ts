import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    height: 100vh;

    header {
        display: flex;
        align-items: center;
        background: #232F34;
        padding: 1.4rem 0 1.6rem 10.4rem;

        img {
            width: 4.8rem;
        }

        h1 {
            margin-left: 1.6rem;
            padding-top: 0.8rem;
            font-size: 2.2rem;
            font-weight: 500;
            color: #fff;
        }
    }

    h2 {
        margin: 3.2rem 0 4rem 10.4rem;
        font-size: 1.6rem;
        font-weight: 400;
        
        strong {
            font-weight: 600;
        }
    }

    > img {
        position: absolute;
        width: 4.8rem;
        right: 2.4rem;
        bottom: 1.6rem;
    }
`;

export const Profiles = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    a {
        text-decoration: none;
        color: #424242;

        &:visited {
            color: #424242;
        }
    }

    div {
        cursor: pointer;

        margin: 0 4.8rem;
        width: 28rem;
        height: 34rem;
        
        display: flex;
        flex-direction: column;
        align-items:center;
        justify-content: center;

        background: #FFFFFF;
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
        border-radius: 8px;

        
        img {
            width: 15.2rem;
        }

        P {
            margin-top: 2.4rem;
            font-size: 1.6rem;
            font-weight: 400;

            strong {
                font-weight: 800;
            }
        }

        &:hover {
            box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.2);
            background-color: rgba(245, 245, 245, .4);
        }
    }
`;
