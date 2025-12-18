/** @jsxImportSource @emotion/react */
import ReactModal from "react-modal";
import * as s from "./styles";
import { useMeQuery } from "../../queries/usersQueries";
import Loading from "../common/Loading";
import Select from "react-select";
import { IoCloudUploadOutline, IoPaperPlaneOutline, IoAddCircleOutline } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { useRef, useState } from "react";
ReactModal.setAppElement("#root");

function AddPostModal({isOpen, onRequestClose, layoutRef}){
    const [ uploadImages, setUploadImages ] = useState([]);
    const imageListBoxRef = useRef();
    const { isLoading, data } = useMeQuery();

    const handleOnWheel = (e) => {
        imageListBoxRef.current.scrollLeft += e.deltaY * 0.2;
    }

    const handleFileLoadOnClick = () => {
        const fileInput = document.createElement("input");
        fileInput.setAttribute("type","file");
        fileInput.setAttribute("accept","image/*");
        fileInput.setAttribute("multiple","true");
        fileInput.click();

        fileInput.onchange = (e) => {
            const {files} = e.target;
            const fileArray = Array.from(files);

            // 파일 올리는 순서를 지키기 위하여 promiseAll을 사용한다.
            const ReadFile = (file) => new Promise((resolve) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = (e) => {
                    resolve({
                        file,
                        dataUrl: e.target.result,
                    });
                }
            });

            Promise
            .all(fileArray.map(file => ReadFile(file)))
            .then(result => {
                setUploadImages([...uploadImages, ...result]);
            }); 
        }
    }
    if (isLoading){
        return <Loading />
    }

    return <ReactModal
    style={{
        overlay:{
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#00000000"
        },
        content: {
            position: "static",
            boxShadow: "0 0 10px 5px #00000033",
            padding: "0",
        }
    }}

    isOpen={isOpen}
    onRequestClose={onRequestClose}
    parentSelector={()=> layoutRef.current}
    appElement={layoutRef.current}
    ariaHideApp={false}>
        <div css={s.modalLayout}>
            <header>
                <h2><IoPaperPlaneOutline/>New Post</h2>
            </header>
            <main>
                <div css={s.profileContainer}>
                    <div css={s.profileImg(data.data.imgUrl)}></div>
                    <div>{data.data.nickname}</div>
                </div>
                <Select
                    options={[
                        {
                            label: "Public",
                            value: "Public"
                        },
                        {
                            label: "Follow",
                            value: "Follow"
                        },
                ]}/>
                <div css={s.contentInputBox}>
                    <textarea></textarea>
                </div>
                <div css={s.uploadBox}>
                    <IoCloudUploadOutline/>
                    <div>Please post your story.</div>
                    <button onClick={handleFileLoadOnClick}><IoAddCircleOutline /> Image</button>
                </div>
                <div css={s.imageListBox} ref={imageListBoxRef} onWheel={handleOnWheel}>
                    {
                        uploadImages.map(img => (
                            <div css={s.preview(img.dataUrl)}>
                                <div><IoIosClose /></div>
                            </div>
                        ))
                    }
                </div>
            </main>
            <footer>
                <button css={s.postButton}>Post</button>
                <button onClick={onRequestClose}>Cancel</button>
            </footer>
        </div>

    </ReactModal>
}

export default AddPostModal;