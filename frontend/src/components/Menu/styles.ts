import styled, { css } from 'styled-components';

interface MenuItemProps {
    active: boolean;
    visible: boolean;
  }

export const Container = styled.section`
    position: fixed;
    background: #FFFFFF;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
    height: 100vh;
    width: 24rem;

    section {
        padding-top: 1.6rem;
        text-align: center;

        img {
            width: 6.4rem;
        }

        h3 {
            font-size: 1.4rem;
            font-weight: 400;
        }

        hr {
            width: 50%;
            margin: 3.2rem auto;
            opacity: 0.3;
            color: #212121;
        }
    }
`;

export const MenuItem = styled.li<MenuItemProps>`
    cursor: pointer;
    list-style: none;

    div {
        display: flex;
        align-items: center;
        padding: 0.8rem 1.6rem;

        p {
            margin-left: 1.6rem;
            font-size: 1.4rem;
        }

        &:hover {
            box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.2);
            background-color: rgba(240, 240, 240, .6);
            color: #2F4A64;
        }
    }

    a {
        color: #424242;
        text-decoration: none;
    }

    ${(props) =>
        props.active &&
        css`
            background-color: rgba(240, 240, 240, .6);
            color: #2F4A64;

            div {
                padding: 0.8rem 0.8rem;
                border-left: 0.8rem solid #2F4A64;

            }

            ul li {
                display: flex;
                align-items: center;
            }
        `}

    ${(props) =>
        props.visible === false && css` display: none;`
    }
`;

export const SubMenuItem = styled.ul` 
    li {
        display: none;
        padding: 0.8rem 1.6rem;
        background-color: #2F4A64;
        border-bottom: 1px solid #fff;
        font-size: 1.4rem;
        font-weight: 300;
        color: #fff;

        a {
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            color: #fff;

            p {
                margin-left: 2rem;
            }
        }  

        &:hover a {
            color: #ff9000;
            font-weight: 500;
        } 
    }
    
`;