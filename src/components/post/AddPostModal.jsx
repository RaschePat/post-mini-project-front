/** @jsxImportSource @emotion/react */
import ReactModal from "react-modal";
import * as s from "./styles";
import { useMeQuery } from "../../queries/usersQueries";
import Loading from "../common/Loading";
import Select, { components } from "react-select";
import { IoCloudUploadOutline, IoPaperPlaneOutline, IoAddCircleOutline } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { useRef, useState } from "react";
import { createPost } from "../../apis/posts/postsApi";
import { useCreatePostMutation } from "../../mutations/postMutations";
ReactModal.setAppElement("#root");

// 커스텀 Select 스타일
const customSelectStyles = {
    control: (provided) => ({
        ...provided,
        minHeight: '30px',
        height: '30px',
        fontSize: '13px',
        borderRadius: '5px',
        width: '110px',
        border: '1px solid #dbdbdb',
        boxShadow: 'none',
        '&:hover': {
            border: '1px solid #999'
        }
    }),
    valueContainer: (provided) => ({
        ...provided,
        height: '30px',
        padding: '0 8px'
    }),
    input: (provided) => ({
        ...provided,
        margin: '0',
        padding: '0'
    }),
    indicatorSeparator: () => ({
        display: 'none'
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        padding: '4px',
        svg: {
            width: '16px',
            height: '16px'
        }
    }),
    menu: (provided) => ({
        ...provided,
        fontSize: '13px',
        borderRadius: '8px',
        overflow: 'hidden'
    }),
    option: (provided, state) => ({
        ...provided,
        padding: '8px 12px',
        backgroundColor: state.isSelected ? '#f0f0f0' : state.isFocused ? '#f8f8f8' : 'white',
        color: '#333',
        cursor: 'pointer',
        '&:active': {
            backgroundColor: '#e8e8e8'
        }
    }),
    singleValue: (provided) => ({
        ...provided,
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
    })
};

// 커스텀 SingleValue 컴포넌트 (선택된 값 표시)
const CustomSingleValue = ({ children, ...props }) => {
    const emoji = props.data.value === "Public" ? "🔓" : "🔒";
    return (
        <components.SingleValue {...props}>
            <span>{emoji}</span>
            <span>{props.data.label}</span>
        </components.SingleValue>
    );
};

// 커스텀 Option 컴포넌트 (드롭다운 옵션)
const CustomOption = (props) => {
    const emoji = props.data.value === "Public" ? "🔓" : "🔒";
    return (
        <components.Option {...props}>
            <span style={{ marginRight: '5px' }}>{emoji}</span>
            <span>{props.data.label}</span>
        </components.Option>
    );
};

function AddPostModal({isOpen, onRequestClose, layoutRef}){
    const [ visibilityOption, setVisibilityOption ] = useState({label: "Public", value: "Public"});
    const [ textareaValue, setTextareaValue ] = useState("")

    const [ uploadImages, setUploadImages ] = useState([]);
    const imageListBoxRef = useRef();
    const { isLoading, data } = useMeQuery();
    const createPostMutation = useCreatePostMutation();

    const visibilityOptions = [
        { label: "Public", value: "Public" },
        { label: "Follow", value: "Follow" }
    ];

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

            const readFile = (file) => new Promise((resolve) => {
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
            .all(fileArray.map(file => readFile(file)))
            .then(result => {
                setUploadImages([...uploadImages, ...result]);
            }); 
        }
    }

    const handleImageDeleteOnClick = (index) => {
        const deletedImages = uploadImages.filter((img, imgIndex) => imgIndex !== index);
        setUploadImages(deletedImages);
    }

    const handlePostSubmitOnClick = async () => {
        const formData = new FormData();
        formData.append("visibility", visibilityOption.value);
        formData.append("content", textareaValue);
        for (let img of uploadImages){
            formData.append("files", img.file);
        }
        try{
            await createPostMutation.mutateAsync(formData);
            alert("작성 완료");
            onRequestClose();
        } catch (error) {
            alert(error.response.data.message);
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
        {
            createPostMutation.isPending && <Loading />
        }
        <div css={s.modalLayout}>
            <header>
                <h2><IoPaperPlaneOutline/>New Post</h2>
            </header>
            <main>
                <div css={s.profileContainer}>
                    <div css={s.profileImg(data.data.imgUrl)}></div>
                    <div css={s.profileName}>{data.data.nickname}</div>
                    <Select
                        options={visibilityOptions}
                        value={visibilityOption}
                        onChange={(option) => setVisibilityOption(option)}
                        styles={customSelectStyles}
                        components={{
                            SingleValue: CustomSingleValue,
                            Option: CustomOption
                        }}
                        isSearchable={false}
                    />
                </div>
                <div css={s.contentInputBox}>
                    <div>Comment</div>
                    <textarea 
                        value={textareaValue} 
                        onChange={(e) => setTextareaValue(e.target.value)}
                        placeholder="내용 작성..."
                    ></textarea>
                </div>
                <div css={s.uploadBox} onClick={handleFileLoadOnClick}>
                    <IoCloudUploadOutline/>
                    <div>Please post your story.</div>
                    <button><IoAddCircleOutline /> Image</button>
                </div>
                <div css={s.imageListBox} ref={imageListBoxRef} onWheel={handleOnWheel}>
                    {
                        uploadImages.map((img, index) => (
                            <div key={index} css={s.preview(img.dataUrl)}>
                                <div onClick={() => handleImageDeleteOnClick(index)}><IoIosClose /></div>
                            </div>
                        ))
                    }
                </div>
            </main>
            
            <footer>
                <button css={s.postButton} onClick={handlePostSubmitOnClick}>Post</button>
                <button onClick={onRequestClose}>Cancel</button>
            </footer>
        </div>

    </ReactModal>
}

export default AddPostModal;