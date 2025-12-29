/** @jsxImportSource @emotion/react */
import { BiSend } from "react-icons/bi";
import * as s from "./styles";
import { useState } from "react";
import { useCreatePostCommentMutation } from "../../mutations/postMutations";
import { useGetCommnetsQuery } from "../../queries/commentsQueries";

function Comment({postId}) {
    const [ inputValue, setInputValue ] = useState("");
    const [ recomment, setRecomment ] = useState({
        parentCommentId: 0,
        parentUserId: 0,
    });
    const commentMutation = useCreatePostCommentMutation();
    const { isLoading , data, refetch } = useGetCommnetsQuery(postId);

    const handleOnChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleOnSubmit = async () => {
        const data = {
            ...recomment,
            content: inputValue,
        };

        await commentMutation.mutateAsync({postId, data});
        await refetch();
        setInputValue("");
    }

    const handleOnKeyDown = (e) => {
        if (e.key === "Enter") {
            handleOnSubmit();
        }
    }

    const handleRecommentOnClick = (commentId, userId) => {
        setRecomment({
            parentCommentId: commentId,
            parentUserId: userId,
        })
    }

    const timeAgo = d => {
        const t = (Date.now() - new Date(d)) / 1000;
        if (t < 60) return "방금";
        if (t < 3600) return `${t / 60 | 0}분`;
        if (t < 86400) return `${t / 3600 | 0}시간`;
        return `${t / 86400 | 0}일`;
    };

    return <div css={s.layout}>
        <h2>댓글</h2>
        <div css={s.commentItemList}>
            {
                !isLoading &&
                data.data.map(comment => (
                    <div key={comment.commentId} css={s.commentItem(comment.level, comment.commentId === recomment.parentCommentId)}>
                        <div css={s.commentProfileImg(comment.imgUrl)}></div>
                        <div>
                            <div>
                                <div>{comment.nickname}</div>
                                <div>{timeAgo(comment.createdAt)}</div>
                            </div>
                            <div><span>{!!comment.parentNickname && "@" + comment.parentNickname}</span>{comment.content}</div>
                            <div>
                                {
                                !comment.parentCommentId && ( comment.commentId === recomment.parentCommentId ?
                                <span onClick={() => handleRecommentOnClick(0, 0)}>답글 취소</span> :
                                <span onClick={() => handleRecommentOnClick(comment.commentId, comment.userId)}>답글 달기</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
        <div>
            <div css={s.commentInput}>
                <input type="text" 
                    placeholder="댓글을 입력하세요."
                    value={inputValue}
                    onChange={handleOnChange}
                    onKeyDown={handleOnKeyDown} />
                <BiSend onClick={handleOnSubmit}/>
            </div>
        </div>
    </div>
}

export default Comment;