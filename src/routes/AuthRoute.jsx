import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import { useEffect } from "react";
import OAuth2 from "../pages/auth/OAuth2";
import { useMeQuery } from "../queries/usersQueries";

function AuthRoute(){
    const navigate = useNavigate();
    const location = useLocation();
    const {pathname} = location;

    const meQuery = useMeQuery();

    // 잘못된 경로로 들어왔을 때 강제 경로 이동
    useEffect(() => {
        const { isLoading, data } = meQuery;
        if(!isLoading){
            // 로그인이 안된 상태에서 홈으로 들어오면 로그인 페이지로 보내겠다.
            if(data.status !== 200){
                if (!pathname.startsWith("/auth")){
                    navigate("/auth/login");
                }
            } else {
                // 로그인에 성공을 하고 로그인 화면으로 들어가려고 하면 홈으로 보내겠다.
                if (pathname.startsWith("/auth")){
                    navigate("/");
                }
            }
        }
    },[pathname, meQuery.data]);

    return <Routes>
        <Route path="/" element={<></>}/>
        <Route path="/auth/login" element={<Login/>} />
        <Route path="/auth/login/oauth2" element={<OAuth2/>} />
        <Route path="/auth/signup" element={<SignUp/>} />
    </Routes>
}

export default AuthRoute;