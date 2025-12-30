/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { sendTextOpenai } from "../../apis/openai/openaiApi";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import 'highlight.js/styles/github-dark.css';
import { PulseLoader } from "react-spinners";
import { MdUpload } from "react-icons/md";

function TypingEffect({text, speed = 50}){
    const [ displayText, setDisplayText ] = useState("");
    const textIndex = useRef(0);

    useEffect(() => {
        const textArray = Array.from(text);
        
        const timer = setInterval(() => {
            if (textIndex.current < textArray.length) {
                setDisplayText(prev => prev + textArray[textIndex.current++]);
            } else {
                clearInterval(timer);
            }
        }, speed);
        
        return () => clearInterval(timer);
    },[text]);

    return <div>
        <ReactMarkdown rehypePlugins={rehypeHighlight}>
        {displayText}
        </ReactMarkdown>
    </div>
}

function OpenaiApiModal(){
    const [ chatData, setChatData ] = useState([]);
    const [ inputValue, setInputValue ] = useState("");
    const [ response, setResponse ] = useState(null);
    const [ isLoading, setLoading ] = useState(false);
    const [ disabled, setDisabled ] = useState(true);

    useEffect(() => {
        setDisabled(!inputValue.trim());
    },[inputValue]);

    const handleOnKeyDown = (e) => {
        if(!e.shiftKey && e.key === "Enter") {
            e.preventDefault();  
    
            if(e.target.value.trim()) {  
                handleSend();
            }
        }
    }

    const handleSend = () => {
        setLoading(true);
        setChatData(prev => [...prev, {
            type: "question",
            content: inputValue,
        }]);
        setInputValue("");
    }
    
    useEffect(() => {
        if (!!chatData.length && chatData[chatData.length-1].type === "question"){
            sendTextOpenai(chatData[chatData.length-1].content)
            .then(resp => {
                setChatData(prev => [...prev, {
                    type: "answer",
                    content: resp.output_text,
                }]);
            })
        } else {
            setLoading(false);
        }

    }, [chatData]);

    return <div css={s.layout}>
        <div css={s.chatContainer}>
            {
                chatData.map((data, index) => {
                    if(data.type === "question"){
                        return <div key={index} css={s.question}>{data.content}</div>
                    }else if (index === chatData.length-1){
                        return <div key={index} css={s.answer}>
                            {
                                !isLoading && !!data.content &&
                                <TypingEffect text={data.content} speed={10}/>
                            }
                        </div>
                    } else {
                        return <div key={index} css={s.answer}><ReactMarkdown rehypePlugins={rehypeHighlight}>{data.content}</ReactMarkdown></div>
                    }
                })
            }
            {
                isLoading && <PulseLoader />
            }
        </div>
        <div css={s.inputContainer}>
            <textarea type="text" value={inputValue} onKeyDown={handleOnKeyDown} onChange={(e) => setInputValue(e.target.value)}/>
            <button onClick={handleSend} disabled={disabled}><MdUpload /></button>
        </div>
    </div>
}

export default OpenaiApiModal;