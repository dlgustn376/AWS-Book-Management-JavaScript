import React from 'react';
import { Navigate } from 'react-router-dom'; 
import { authenticatedState } from './../../../atoms/Auth/AuthAtoms';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { useQuery } from 'react-query';
import { getAuthenticated } from '../../../api/Auth/AuthApi';

// 서버에 유효한 토큰인지 확인 요청을 보냄
const validateToken = async (accessToken) => {
    const response = await axios.get("http://localhost:8080/auth/authenticated", {params: {accessToken}});
    return response.data;       //서버에서 받아온 data는 true or false(Promise에 담겨서 옴.)
}

//

const AuthRoute = ({path,  element }) => {
   
    const accessToken = localStorage.getItem("accessToken");
    const [authenticated, setAuthenticated] = useRecoilState(authenticatedState);
    setAuthenticated(data);

    // 로그인 상태에서 localStorage에서 token을 다시 던져 주어서 true를 만들어 준다.
    const permitAll = ["/login","/register", "/password/forgot"];
    // 인증이 안됐을 때
    
    if(!authenticated){
        
        if(accessToken !== null){
            validateToken(accessToken).then((flag) =>{      // flag는 response.data
                setAuthenticated(flag);
            });

            if(authenticated){
                return element;
            }
            // setAuthenticated(false);        // 페이지를 이동하다 만료기간이 지나면 로그인 페이지로 이동.
            // alert("로그인 후 이용부탁드립니다.");
            console.log("페이지 이동 테스트");
            return <Navigate to={path}/>        // App.js <Route path="/" element={<AuthRoute path="/" element={<Main />} />}/> 다시 실행
        }
        if(permitAll.includes(path)){
            return element;

        }
        return <Navigate to="/login"/>;
    }

    
    if(permitAll.includes(path)){
        return <Navigate to="/"/>;
    }
    
    return element;
};

export default AuthRoute;