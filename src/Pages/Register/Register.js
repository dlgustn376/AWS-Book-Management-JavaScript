/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginInput from '../../components/UI/Login/LoginInput/LoginInput';
import { FiUser,FiLock } from 'react-icons/fi';
import {BiRename} from 'react-icons/bi';
import axios from 'axios';
// import { FcGoogle } from 'react-icons/fc';

const container = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 30px;
    
`;

const logo =css`
    margin: 50px 0px; 
    font-size: 34px;
    font-weight: 600;
`;

const mainContainer= css`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    padding: 40px 20px;
    width: 400px;
`;

const authForm =css`
    width: 100%;
`;

const errorMsg =css`
    margin-left: 5px;
    margin-bottom: 20px;
    font-size: 12px;
    color: red;
`;

const inputLabel =css`
    margin-left: 5px;
    font-size: 12px;
    font-weight: 600;
`;

const loginButton = css`
    margin: 10px 0px;
    border: 1px solid #dbdbdb;
    border-radius: 7px;
    width: 100%;
    height: 50px;
    background-color: white;
    font-weight: 900;
    cursor: pointer;

    &:hover{
        background-color: #fafafa;
    }

    &:active{
        background-color: #eee;
    }
`;


const signupMessage = css`
    margin-top: 20px;
    font-size: 14px;
    font-weight: 600;
    color: #777;
`;

const register =css`
    margin-top: 10px;
    font-weight: 600;
    
`;




const Register = () => {

    const [registerUser, setRegisterUser] = useState({email: "", password: "", name: ""})
    const [errorMessages, setErrorMessages] = useState({email: "", password: "", name: ""})

    const onChangeHandle = (e) => {
        const {name, value} = e.target;
        setRegisterUser({...registerUser, [name]: value})
    }

    const registeSubmit = async () => {
        const data = {
            ...registerUser
        }
        const option = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        // await은 async 안에만 쓸수 있다.
        // await 호출에 return이 있는경우 변수에 담을 수 있다.
        try {
            const response = await axios.post("http://localhost:8080/auth/signup", JSON.stringify(data), option);    // Promise
            setErrorMessages({email: "", password: "", name: ""});
            console.log(response);
        } catch (error) {
            setErrorMessages({email: "", password: "", name: "", ...error.response.data.errorData});
        }

        // .then(response => {      // resolve 
        //     setErrorMessages({email: "", password: "", name: ""});
        //     console.log(response);
        //     // return "test";      // then에서 받은 return은 Promise이다.
        // })
        // .catch(error => {       // reject
        //     console.log(error.response.data.errorData)
        //     setErrorMessages({email: "", password: "", name: "", ...error.response.data.errorData});
            
        // });

    }

    return (
        <div css={container}>
            <header>
                <h1 css={logo}>SIGN UP</h1>
            </header>
            <main css={mainContainer}>
                <div css={authForm}>
                    <label css={inputLabel}>Email</label>
                    <LoginInput type="email" placeholder="Type your email" onChange={onChangeHandle} name="email">
                        <FiUser />
                    </LoginInput>
                    <div css={errorMsg}>{errorMessages.email}</div>
                    <label css={inputLabel}>Password</label>
                    <LoginInput type="password" placeholder="Type your password" onChange={onChangeHandle} name="password">
                        <FiLock />
                    </LoginInput>
                    <div css={errorMsg}>{errorMessages.password}</div>
                    <label css={inputLabel} >Name</label>
                    <LoginInput type="text" placeholder="Type your name" onChange={onChangeHandle} name="name">
                        <BiRename />
                    </LoginInput>
                    <div css={errorMsg}>{errorMessages.name}</div>
                    
                    <button css={loginButton} onClick={registeSubmit}>REGISTER</button>
                </div>
            </main>

                <div css={signupMessage}>Already a user?</div>
            
            <footer>
                <div css={register}><Link to="/login">LOGIN</Link></div>
            </footer>
        </div>
    );
};

export default Register;