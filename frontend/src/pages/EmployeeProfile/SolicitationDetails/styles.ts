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

        strong {
            display: block;
            margin-bottom: 1.6rem;
        }

        textarea {
            width: 100%;
            padding: 12px;
            border: 1px solid rgba(75, 88, 94, 0.5);
            border-radius: 8px;
            font-size: 1.6rem;
            font-weight: 500;
            color: rgba(75, 88, 94, 1);

            &::placeholder {
            color: rgba(75, 88, 94, 0.7);
            font-weight: 400;
            font-size: 1.4rem;
            }
        }

        button {
            padding: 1rem 1.6rem;
            margin-left: 3.2rem;
            border: 0;
            font-size: 1.5rem;
            border-radius: 0.8rem;
            color: #FFF;
            background-color: #4B585E;

            &:hover {
                background-color: #404f54;
                box-shadow: 0 0 4px 1px #404F5444;
            }
        }
    }

`;

export const CommentItem = styled.div`
    position: relative;
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

    > button {
        position: absolute;
        top: 0.8rem;
        right: 0.8rem;
        background: transparent !important;
        border-radius: 0.8rem !important;
        padding: 0.2rem !important;
        border: 0 !important;
        outline: 0 !important;

        &:hover {
            background-color: rgba(190, 190, 190, 0.2) !important;
        } 
    }
`;

export const UpdateSolicitationArea = styled.section`
    margin: 0;
    margin-top: 1.6rem;

    > button {
        display: flex;
        align-items: center;
        border: 1px solid #aaa6;
        border-radius: 0.8rem;
        padding: 0.4rem 0.8rem;;
        background: #aaa2;
        font-size: 1.4rem;
        font-weight: 400;
        color: #424242;

        &:hover {
            font-weight: 500;
            border: 1px solid #aaaa;
            box-shadow: 1px 1px 2px 1px #42424222;
        }

        svg {
            margin-right: 0.8rem;
        }
    }

    footer {
        position: relative;
        padding-bottom: 2.4rem;

        button.closebtn {
            outline: 0;
            position: absolute;
            top: 0;
            right: 0;
            display: flex;
            align-items: center;
            border: 1px solid #aaa6;
            border-radius: 0.8rem;
            padding: 0.4rem 0.8rem;;
            background: #aaa1;
            font-size: 1.4rem;
            font-weight: 400;
            color: #424242;

            &:hover {
                font-weight: 500;
                border: 1px solid #aaaa;
                box-shadow: 1px 1px 2px 1px #42424222;
            }

            svg {
                margin-right: 0.8rem;
            }
        }

        select {
            padding: 12px;
            padding-right: 34px;

            border: 1px solid rgba(75, 88, 94, 0.5);
            border-radius: 8px;

            font-size: 1.4rem;
            font-weight: 500;
            color: rgba(75, 88, 94, 1);
        } 

        input {
            padding: 12px;

            border: 1px solid rgba(75, 88, 94, 0.5);
            border-radius: 8px;

            font-size: 1.4rem;
            font-weight: 500;
            color: rgba(75, 88, 94, 1);

            &::placeholder {
                color: rgba(75, 88, 94, 0.7);
                font-weight: 400;
                font-size: 1.4rem;
            }
        }

        div > button {
            padding: 1rem 1.6rem;
            margin-left: 3.2rem;
            height: 4rem;
            align-self: flex-end;
            border: 0;
            font-size: 1.4rem;
            border-radius: 0.8rem;
            color: #FFF;
            background-color: #4B585E;

            &:hover {
                background-color: #404f54;
                box-shadow: 0 0 4px 1px #404F5444;
            }
        }

        label {
            font-size: 1.5rem;
        }

        .dflex {
            display: flex;
        }

        .dcolumn {
            display: flex;
            flex-direction: column;
        }
    }

`;
