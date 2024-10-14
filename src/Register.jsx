import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
axios.defaults.baseURL = 'http://localhost:3333';
export default function Register() {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [name, setName] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [nameValid, setNameValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    const navigate = useNavigate();

    const handleEmail = (e) => {
        setEmail(e.target.value);
        const regex = 
            /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (regex.test(email)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }
    }

    const handlePw = (e) => {
        setPw(e.target.value);
        if (pw.length < 3) setPwValid(false);
        else setPwValid(true);
        // const regex = 
        //     /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        // if (regex.test(pw)) {
        //     setPwValid(true);
        // } else {
        //     setPwValid(false);
        // }
    }

    const handleName = (e) => {
        if (name.length < 2) setNameValid(false);
        else setNameValid(true);
        setName(e.target.value);
    }

    const onClickConfirmButton = () => {
        
        axios.post("/signup", { email:email, password:pw, name:name },
            { headers: { 'content-type': 'application/json' },withCredentials:true}).then((res) => {
            console.log(res.status);
            if(res.status === 400) {
                alert("ID, Password가 비어있습니다.");
              }
              else if(res.status === 401) {
                alert("존재하지 않는 ID입니다.");
              }
              else if(res.status === 402) {
                alert("Password가 틀립니다.");
              }
              else if(res.status === 201) {  
                alert('회원가입이 완료되었습니다.'); 
                navigate('/');

              }

        }
        ).catch((err) => {
            console.log(err);   
        } 
    );
    }

    useEffect( () => {
        if (emailValid && pwValid && nameValid) {
            setNotAllow(false);
            return;
        }
        setNotAllow(true);
    }, [emailValid, pwValid, nameValid]);

    return (
        <div className="page">
            <div className='titleWrap'>
                이메일과 비밀번호를
                <br/>
                입력해주세요
            </div>
            <div className="contentWrap">
                <div className="inputTitle">이메일 주소</div>
                <div className="inputWrap">
                    <input 
                        type="text"
                        className="input" 
                        placeholder="you@example.com"
                        value={email}
                        onChange={handleEmail}/>
                </div>   
                <div className="errorMessageWrap">
                    {
                        !emailValid && email.length > 0 && (
                            <div>올바른 이메일을 입력해주세요.</div>
                    )}
                </div>   
                <div style={{ marginTop: "26px" }} className="inputTitle">비밀번호</div>
                <div className="inputWrap">
                    <input 
                        type="password"
                        className="input" 
                        placeholder='3자 이상'
                        value={pw}
                        onChange={handlePw}/>
                </div>   
                <div className="errorMessageWrap">
                    {
                        !nameValid && name.length > 0 &&(
                            <div>3자 이상 입력해주세요.</div>  
                    )}
                </div>
                <div style={{ marginTop: "26px" }} className="inputTitle">닉네임</div>
                <div className="inputWrap">
                    <input 
                        type="text"
                        className="input" 
                        placeholder='2자 이상'
                        value={name}
                        onChange={handleName}/>
                </div>
                <div className="errorMessageWrap">
                    {
                         !nameValid && name.length > 0  && (
                            <div>두 글자 이상 입력해주세요.</div>
                    )}
                </div> 
            </div>
    
            <div className='buttonWrap'>
                <button onClick={onClickConfirmButton} disabled={notAllow} className="bottomButton">
                    가입
                </button>
            </div>
        
            <div className='registerWrap'>
                <div className='registerTitle'>
                    계정이 있으신가요? <Link to="/">로그인하기</Link>
                </div>
            </div>
        </div>
    );
}