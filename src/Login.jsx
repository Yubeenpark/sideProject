import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
axios.defaults.baseURL = 'http://localhost:3333';
export default function Login() {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');

    const [emailValid, setEmailValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    const handleEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
        const regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        setEmailValid(regex.test(value)); // 이벤트 객체에서 값을 가져와 검사
    }

    const handlePw = (e) => {
        const value = e.target.value;
        setPw(value);
    };

    const onClickConfirmButton = (e) => {
        
        console.log('email:', email);
        axios.post("/login", { email:email, password:pw },
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
              else if(res.status === 200) {  
                alert('로그인에 성공했습니다.'); 
                navigate('/info',{state:{userName: res.data.name,userEmail:res.data.email}});

              }

        }
        ).catch((err) => {
            console.log(err);   
        } 
    );

    };

    useEffect(() => {
        setNotAllow(!emailValid ); // 유효성에 따라 버튼 활성화 상태 설정
    }, [emailValid]);

    return (
        <div className="page">
            <div className='titleWrap'>
                <br />
                로그인
            </div>
            <div className="contentWrap">
                <div className="inputTitle">이메일 주소</div>
                <div className="inputWrap">
                    <input
                        type="text"
                        className="input"
                        placeholder="you@example.com"
                        value={email}
                        onChange={handleEmail} />
                </div>

                <div className="errorMessageWrap">
                    {!emailValid && email.length > 0 && (
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
                        onChange={handlePw} />
                </div>
                <div className="errorMessageWrap">
                    {
                         pw.length < 3 && (
                            <div>비밀번호를 3자 이상 입력해주세요.</div>

                    )}
                </div>
            </div>

            <div className='buttonWrap'>
                <button onClick={onClickConfirmButton} disabled={notAllow} className="bottomButton">
                    로그인
                </button>
            </div>
            <div className='registerWrap'>
                <div className='registerTitle'>
                    계정이 없으신가요?  <Link to="/Register">회원 가입 하러가기</Link>
                </div>
            </div>
        </div>
    );
}
