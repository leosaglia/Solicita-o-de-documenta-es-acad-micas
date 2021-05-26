import styled from 'styled-components';

export const Container = styled.div`
     margin-left: 24rem;
     position: relative;

    div.imgProfile {
        z-index: 100;
        position: absolute;
        top: 2.4rem;
        width: 100%;
        text-align: center;

        img {
            width: 15.2rem;
        }
    }

    main {
        padding: 4.8rem;
        padding-top: 6.4rem;
        padding-bottom: 0;
        overflow: hidden;

        h1 {
            font-size: 3.4rem;
            font-weight: 700;
            margin: 0 auto;
            margin-bottom: 2.4rem;
            color: #2F444D;
        }

        h3 {
            margin-top: 2.2rem;
            margin-bottom: 1.6rem;
        }

        p {
            font-size: 1.6rem;
            line-height: 2.4rem;
            font-weight: 400;
        }

        form {
            margin-top: 2.4rem;            
        }

        button {
            margin-top: 2rem;
            padding: 1.2rem 3.2rem;
        }
    }
`;
