import { useLocation } from 'react-router-dom';
export default function Register() {
    const location = useLocation();
    const {userName,userEmail} =location.state; 
    return(
        <div>
            <h1>이름: {userName}<br/>이메일 :{userEmail}</h1>
        </div>
    )
}
