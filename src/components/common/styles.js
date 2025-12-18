import { css, keyframes  } from "@emotion/react";
export const gradientMove = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;
export const layout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export const frame = css`
    display: flex;
    box-sizing: border-box;
    border: 3px solid #747474;
    border-radius: 10px;
    padding: 30px;
    width: 1000px;
    height: 650px;
    background-color: #000000;
`;

export const frameContainer = css`
    box-sizing: border-box;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    border: 2px solid #333;
    background-color: #f3f5f7;
    overflow: hidden;
`;

//////////<<Loading>>//////////
export const loadingBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 100%;
    background-color: #00000066;
`;

//////////<<LeftSideBar>>//////////
export const sideBarLayout = css`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
`;

export const sideBarContainer = css`
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 100%;
    background-color: #ffffff;
    box-shadow: 0 0 6px -5px;
    
    & > h1 {
        margin: 20px;
        margin-left: 15px;
        font-size: 27px;
        font-family: "Pacifico", cursive;
        font-weight: 400;
        font-style: normal;
        text-align: center;
        cursor: default;
        transition: all 0.1s ease-in-out;
        color: #202020ee;

        &:hover {
            background: linear-gradient(
                -30deg,
                #222222,
                #bbbbbbff,
                #222222
            );
            background-size: 400% 400%;
            animation: ${gradientMove} 3s ease-in-out infinite;

            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }

    & > ul {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        padding: 5px;
        margin: 0;
        gap: 8px;
        flex-grow: 1;

        & > a {
            text-decoration: none;
            color: #222222;
        }
    }

    & > div {
        display: flex;
        justify-content: center;
        padding: 20px;

        & > a {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 3px;
            text-decoration: none;
            color: #222222;
            font-weight: 500;
        }
    }
`;

export const menuListItem = (isSelected) => css`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border-radius: 7px;
    padding: 5px 15px;
    width: 100%;
    height: 35px;
    font-weight: 500;
    transition: all 0.2s ease-in-out;
    background-color: ${isSelected ?"#202020ee" : ""};
    color: ${isSelected ?"#ffffff" : ""};

    &:hover{
        font-size: 17px;
    }
    & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 3px;
        width: 30px;
        height: 100%;
        font-size: 25px;
    }
    
`;

export const profileImg = (url) => css`
    border: 2px solid #202020cc;
    box-sizing: border-box;
    border-radius: 50%;
    width: 26px;
    height: 26px;
    overflow: hidden;
    background-image: url(${url});
    background-position: center;
    background-size: cover;
`
