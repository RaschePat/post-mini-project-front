import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
`;

export const chatContainer = css`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    height: 83%;
    min-height: 75%;
    overflow-y: scroll;
`;

export const inputContainer = css`
    display: flex;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 10px;
    width: 100%;
    min-height: 50px;
    max-height: 20%;
    background-color: #fafafa;
    box-shadow: 0 0 10px #00000044;

    & > textarea {
        flex-grow: 1;
        border: none;
        outline: none;
        resize: none;
        background-color: transparent;
        font-size: 14px;
        font-family: "Noto Sans KR", sans-serif;
    }

    & > button {
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        border-radius: 5px;
        width: 35px;
        background-color: #444444;
        cursor: pointer;
        color: #fafafa;
        font-size: 18px;
        
        &:hover{
            background-color: #232323;
        }

        &:active{
            background-color: #111111;
        }

        &:disabled{
            background-color: #999999;
            cursor: default;
        }
    }
`;

export const answer = css`
    box-sizing: border-box;
    border-radius: 8px;
    background-color: #999999;
    padding: 10px;
    width: fit-content;

    & > p{
        margin: 0;
    }
`;

export const question = css`
    box-sizing: border-box;
    border-radius: 8px;
    background-color: #444444;
    padding: 10px;
    color: #fefefe;
    width: fit-content;
    max-width: 80%;
    align-self: flex-end;
    white-space: pre-wrap; 
    word-break: break-word; 
`;