/** @jsxImportSource @emotion/react */
import { data, Link, useLocation } from "react-router-dom";
import * as s from "./styles";
import { IoHomeOutline , IoAddCircleOutline, IoExitOutline } from "react-icons/io5";
import { MdOutlineExplore , MdOutlineMessage  } from "react-icons/md";
import { useMeQuery } from "../../queries/usersQueries";
import { useEffect, useRef, useState } from "react";
import AddPostModal from "../post/AddPostModal";
import { RiChatSmileAiLine, RiCloseCircleLine, RiCloseLargeLine, RiCloseLine } from "react-icons/ri";
import OpenaiApiModal from "../openai/OpenaiApiModal";


function LeftSideBar({children}){
    const location = useLocation();
    const {pathname} = location;
    const [ addPostModalOpen, setAddPostModalOpen ] = useState(false);
    const [ openaiModalOpen, setOpenaiModalOpen ] = useState(false);
    const [ homeRefresh, setHomeRefresh ] = useState(false); 
    const layoutRef = useRef();

    const {isLoading, data} = useMeQuery();

    useEffect(()=>{
        if(homeRefresh){
            setHomeRefresh(false);
        }
    },[homeRefresh])

    const handleEscKey = (e) => {
        if (e.key === "Escape" && openaiModalOpen){
            openaiModalClose();
        }
    }

    useEffect(()=>{
        document.addEventListener("keydown", handleEscKey);
        return () => document.removeEventListener("keydown", handleEscKey);
    }, [handleEscKey]);

    const handleAddPostModalOpenOnClick = () => {
        setAddPostModalOpen(true);
    }

    const addPostModalClose = () => {
        setAddPostModalOpen(false);
    }

    const handleOpenaiModalOpenOnClick = () => {
        const isOpen = openaiModalOpen;
        setOpenaiModalOpen(!isOpen);
    }

    const openaiModalClose = () => {
        setOpenaiModalOpen(false);
    }

    
    return <div css={s.sideBarLayout} ref={layoutRef}>
        <aside css={s.sideBarContainer}>
            <h1>Social Board</h1>
            <ul>
                <Link to={"/"}>
                    <li css={s.menuListItem(pathname === "/")}><div><IoHomeOutline /></div>Home</li>
                </Link>
                <Link to={"/search"}>
                    <li css={s.menuListItem(pathname === "/search")}><div><MdOutlineExplore/></div>Explore</li>
                </Link>
                <Link to={"/message"}>
                    <li css={s.menuListItem(pathname === "/message")}><div><MdOutlineMessage/></div>Message</li>
                </Link>
                <Link>
                    <li css={s.menuListItem(false)} onClick={handleAddPostModalOpenOnClick}><div><IoAddCircleOutline/></div>Add a Post</li>
                </Link>
                {
                    isLoading || <Link to={"/" + data.data.nickname}>
                        <li css={s.menuListItem(decodeURI(pathname) === "/" + data.data.nickname)}>
                        <div>
                            <div css={s.profileImg(data.data.imgUrl)}>
                            </div>
                        </div>{data.data.nickname}
                        </li>
                    </Link>
                }
            </ul>
            <div>
                <Link to={"/logout"}><IoExitOutline />Logout</Link>
            </div>
        </aside>
        {!homeRefresh && children}
        {
            !!layoutRef.current && addPostModalOpen &&
            <AddPostModal
            isOpen={addPostModalOpen}
            onRequestClose={addPostModalClose}
            layoutRef={layoutRef}
            setHomeRefresh={setHomeRefresh} />
        }
        <div css={s.aiChat(openaiModalOpen)} onClick={handleOpenaiModalOpenOnClick}>{ openaiModalOpen ?  <RiCloseLine/>: <RiChatSmileAiLine/> }</div>
        <div css={s.aiChatLayout(openaiModalOpen)}>
            <div css={s.aiChatContainer}>
                <OpenaiApiModal />
            </div>
        </div>
    </div>
}

export default LeftSideBar;