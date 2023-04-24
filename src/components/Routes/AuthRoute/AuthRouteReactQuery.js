import axios from 'axios';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Navigate } from 'react-router-dom'; 
import { useRecoilState } from 'recoil';
import { refreshState } from './../../../atoms/Auth/AuthAtoms';

const AuthRouteReactQuery = ({ path,  element }) => {
    const [refresh, setRefresh] = useRecoilState(refreshState);
    const {data, isLoading} = useQuery(["authenticated"], async () => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:8080/auth/authenticated", {params: {accessToken}});
        
        return response;
    },{
        enabled: refresh
    });
    //랜더의 처음 마운트 되고 useEffect로 랜더링이 됨.
    useEffect(()=>{
        if(!refresh){
            setRefresh(true);
        }
        // setRefresh(false)
    }, [refresh]);

    if(isLoading){
        console.log("test");
        return (<div>로딩중...</div>);
    }

    if(!isLoading){
        const permitAll = ["/login","/register", "/password/forgot"];
        if(!data.data){     // data가 false이면 로그인 해야 함(Login page로 이동)
            if(permitAll.includes(path)){
                return element;
            }
            return <Navigate to="/login"/>;
        }
        if(permitAll.includes(path)){
            return <Navigate to="/"/>;
        }

        return element;
        
    }
};

export default AuthRouteReactQuery;