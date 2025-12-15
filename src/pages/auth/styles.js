import { css } from "@emotion/react";
import loginBg from "../../assets/login_bg.jpg";

export const layout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export const container = css`
    display: flex;
    border-radius: 10px;
    width: 80%;
    height: 80%;
    background-color: #fff;
    box-shadow: 0 0 5px 1px #00000033;
    overflow: hidden;
`;

// 배경 이미지 가져오기 (전체 채우는 설정)
export const leftBackground = css`
    width: 360px;
    background-image: url(${loginBg});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

`;

export const rightContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    padding: 30px;

    & > h1 {
        color: #222222;
    }

    & > p {
        margin: 0px;
        margin-bottom: 60px;
        font-size: 14px;
        color: #555555;
    }

    & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        gap: 15px;
        
            & > button {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 5px;
                width : 100%;
                box-sizing : border-box;
                border : 1px solid #dbdbdb;
                border-radius: 6px;
                height: 36px;
                cursor: pointer;
                font-weight: 500;
            }
    }
`;

// 구글 테마색
export const google = css`
    background-color: #fff;
`;

// 네이버 테마색
export const naver = css`
    background-color: #03a94d;
    color: #fff;
    
    // 로고 크기 개별 조정 (네이버 로고의 이미지 태그는 svg)
    & > svg {
        font-size: 10px;
    }
`;

// 카카오 테마색
export const kakao = css`
    background-color: #fee500;
    color: #181600;
`;