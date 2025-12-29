import { css } from "@emotion/react";

export const layout = css`
    padding: 10px;

    & > h2 {
        margin: 10px;
    }
`;

export const commentItemList = css`
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    border-width: 2px 0;
    margin-bottom: 20px;
    padding-left: 5px;
    height: 350px;
    overflow-y: scroll;
`;

export const commentItem = (level, isRecomment) => css`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 5px;
    margin: 10px 0;
    background-color: ${isRecomment ? "#dbdbdbff" : "#dbdbdb00"};
    border-radius: 5px;
    width: 100%;
    padding-left: calc(20px * ${level});

    & > div:nth-of-type(1){
        margin: 3px;
        flex-shrink: 0;
    }
    & > div:nth-of-type(2){
        & >  div:nth-of-type(1){
        display: flex;
        align-items: center;
        gap: 5px;
        font-weight: 500;
        font-size: 10px;
        cursor: default;
        
            & > div:nth-of-type(2){
                padding-left: 5px;
                font-size: 10px;
                color: #999999;
                cursor: default;
            }
        } 

        & >  div:nth-of-type(2){
        font-size: 12px;
        word-wrap: break-word;

            & > span {
                color : #1740ba;
            }
        }

        & >  div:nth-of-type(3){
            font-size: 10px;
            color: #999999;
            font-weight: 500;
            cursor: pointer;
        }
    }
    
`;

export const commentProfileImg = (url) => css`
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    background-image: url("${url}");
    background-position: center;
    background-size: cover;
`;

export const commentInput = css`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
    padding: 10px;
    font-size: 18px;

    & > input {
        margin-right: 10px;
        box-sizing: border-box;
        border: none;
        outline: none;
        flex-grow: 1;
    }

    & > svg {
        cursor: pointer;
    }
`;
