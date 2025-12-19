import { css } from "@emotion/react";

export const modalLayout = css`
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 510px;

    & > header {
        box-sizing: border-box;
        padding: 10px 20px;
        height: 50px;

        & > h2 {
            display: flex;
            align-items:center;
            gap: 5px;
            margin: 0;
            & > svg{
                padding-top: 3px;
                font-size: 25px;
            }
        }
    }

    & > main {
        box-sizing: border-box;
        padding: 10px 20px;
        flex-grow: 1;
    }

    & > footer {
        display: flex;
        justify-content: flex-end;
        box-sizing: border-box;
        padding: 10px 20px;
        height: 50px;
    
        & > button {
            font-family: "Noto Sans KR", sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-size: 14px;
            text-align: center;
        }
        & > button:last-child {
            padding-left: 10px;
            background-color: transparent;
        }
    }

`;

export const postButton = css`
    padding: 0 15px;
    background-color: #202020ee;
    color: #ffffff;
`;

export const profileContainer = css`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 0 0 0 10px;
    cursor: default;
`;

export const profileImg = (url) => css`
    margin-right: 10px;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    background-image: url(${url});
    background-position: center;
    background-size: cover;
    
`;

export const contentInputBox = css`
    margin: 10px 0;

    & > div{
        display: flex;
        align-items: center;
        width: 80px;
        padding: 2px;
        box-sizing: border-box;
        border-radius: 5px;
        margin-bottom: 3px;
        font-size: 13px;
        font-weight: 600;
        color: #202020ee;
    }
    & > textarea {
        box-sizing: border-box;
        outline: none;
        border: 1px solid #cccccc;
        border-radius: 4px;
        padding: 5px 10px;
        width: 100%;
        height: 120px;
        resize: none;
        font-family: "Noto Sans KR", sans-serif;
        font-size: 15px;
        color: #222222;
        cursor: pointer;
    }
`;

export const uploadBox = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    border: 1px dashed #cccccc;
    border-radius: 4px;
    padding: 10px;
    cursor: pointer;
    color: #222222;
    font-size: 14px;

    & > button {
        display: flex;
        align-items: center;
        gap: 3px;
        margin: 10px 0 0;
        border: none;
        border-radius: 10px;
        padding: 5px 10px;
        cursor:pointer;
        background-color: #202020ee;
        color: white;

    }
`;

export const imageListBox = css`
    display: flex;
    flex-wrap: nowrap;
    gap: 5px;
    margin-top: 10px;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 5px;
    width: 100%;
    min-width: 0;
    height: 80px;
    background-color: #fafafa;
    overflow-x: auto;
    overflow-y: hidden;


    &::-webkit-scrollbar{
        display: none;
    }
`;

export const preview = (url) => css`
    flex: 0 0 auto;
    position: relative;
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
    width: 70px;
    height: 70px;
    background-image: url(${url});
    background-position: center;
    background-size: cover;

    &::after{
        content: "";
        position: absolute;
        border-radius: 4px;
        inset: 0;
        background: rgba(0, 0, 0, 0.3);
        opacity: 0;
        transition: opacity 0.25s ease;
        pointer-events: none; 
    }

    &:hover::after {
        opacity: 1;
    }

    &:not(:hover) > div {
        opacity: 0;
    }

    & > div {
        position:absolute;
        top: 2px;
        right: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        font-size: 20px;
        color: #ffffff;
        background-color: #202020ee;
        cursor: pointer;
    }
`;

export const profileName = css`
    flex: 1;
`;