/** @jsxImportSource @emotion/react */
import Slider from "react-slick";
import Loading from "../../components/common/Loading";
import { useGetFeeds } from "../../queries/postQueries";
import * as s from "./styles";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useRef, useState } from "react";
import { PulseLoader } from "react-spinners";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { IoChatbubbleOutline } from "react-icons/io5";

function Home(){
    const [ commentOpen, setCommentOpen ] = useState(false);
    const { isLoading, isFetching, isPending, data, hasNextPage, fetchNextPage } = useGetFeeds();
    const loadMoreRef = useRef();
    console.log(isFetching);
    console.log(isLoading);
    console.log(isPending);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const [obs] = entries;
            if(obs.isIntersecting && hasNextPage){
                fetchNextPage();
            }
        },{threshold: 1});
        
        observer.observe(loadMoreRef.current);
    },[hasNextPage]);

    const handleCommentOnclick = () => {
        setCommentOpen(!commentOpen);
    }

    return <div css={s.layout}>
        <div css={s.feedContainer(commentOpen)}>
            {
                (isLoading && <Loading />) || data.pages.map(feeds => feeds.data.contents.map(feed => (
                    <div key={feed.feedId} css={s.feedItemContainer}>
                        <header>
                            <div css={s.profileImage(feed.user?.imgUrl)}></div>
                            <div css={s.userInfo}>
                                <div>{feed.user?.nickname}</div>
                                <div>{feed.createdAt}</div>
                            </div>
                        </header>
                        <main>
                            {
                                feed.imageFiles &&
                                <div css={s.feedImageContainer}>
                                    <Slider
                                        infinite= {true}
                                        speed= {500}
                                        slidesToShow= {1}
                                        slidesToScroll= {1}>
                                            {
                                                feed.imageFiles.map( file => (
                                                <div css={s.feedImage("http://localhost:8080/image"+file.filePath)}>
                                                </div>
                                                ))
                                            }
                                    </Slider>
                                </div>
                            }
                            <div css={s.feedContentContainer}>
                                {feed.content}
                            </div>
                        </main>
                        <footer>
                            <div>{false ? <IoMdHeart/> : <IoMdHeartEmpty/> }</div>
                            <div onClick={handleCommentOnclick}><IoChatbubbleOutline/></div>
                        </footer>
                    </div>
                )))
            }
            <div ref={loadMoreRef}>
                {
                    isFetching && !isLoading &&
                    <PulseLoader
                        color="rgba(32, 32, 32, 0.93)"
                        loading
                        margin={4}
                        size={8}
                        speedMultiplier={0.7}/>
                }
            </div>
        </div>
        <div css={s.commentContainer(commentOpen)}>

        </div>
        {/* <div css={s.followInfoContainer} style={{padding:"10px 0"}}> 

        </div> */}
    </div>
}

export default Home;