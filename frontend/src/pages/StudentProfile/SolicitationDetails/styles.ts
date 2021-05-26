import styled from 'styled-components';

export const Container = styled.div`
    margin-left: 24rem;
    padding-bottom: 2.4rem;

    main {
        padding: 3.2rem;
        margin: 0 8rem;
        font-weight: 400;

        > p {
            text-align: justify;
        }

        section > div {
            position: relative;
            padding: 2.8rem 1.6rem 2.4rem;
            box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.2);
            background-color: #FFF;

            p {
                font-size: 1.6rem;
                line-height: 2.24rem;
            }

            span {
                position: absolute;
                padding: 0.2rem 0.8rem;
                top: -1.2rem;
                left: 1.6rem;
                background-color: #eeefff;
                font-weight: 700;
            }
        }

        div + div {
            margin-top: 3.2rem;
        }
    }

    section.comments {
        padding: 3.2rem;
        margin: 0 11.2rem;
        margin-bottom: 3.2rem;
        font-weight: 400;
        padding: 2.8rem 1.6rem 2.4rem;
        box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.2);
        background-color: #FFF;

        .comments-list > p {
            font-weight: 600;
        }

        > h3 {
            font-size: 2.4rem;
            margin-top: 2.4rem;
        }

        > small {
            display: block;
            font-size: 1.4rem;
            margin-bottom: 2.4rem;
        }

    }

`;

export const CommentItem = styled.div`
    background-color: #eeeeeeaa;
    margin-top: 1.6rem;
    border-radius: 0.8rem;
    padding: 1.6rem;

    header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
            display: flex;
            align-items: center;
            margin: 0;
            font-weight: 600;

            svg {
                margin-right: 0.8rem;
            }
        }

        p {
            display: flex;
            align-items: center;
            margin: 0;
            margin-right: 2.8rem;

            svg {
                margin-right: 0.8rem;
            }
        }

    }

    > div {
        position: relative;
        padding: 1.6rem;
        background-color: #f7f7f7;
        font-size: 1.4rem;

        svg {
            position: absolute;
            top: -0.6rem;
            left: -0.6rem;
        }
    }
`;
