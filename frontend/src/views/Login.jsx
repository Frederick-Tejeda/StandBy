import '../styles/in.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const ServerUrl = 'https://stand-by.onrender.com';

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [isToHome, setIsToHome] = useState(false);

    const navigate = useNavigate();

    const Validate = async () => {

        let users = await axios.get(`${ServerUrl}/users`)
        users = users.data;

        if(username.length < 1 || password.length < 1){
            setMessage('Field or fileds empty...')
            return
        }

        let currentUser = users.find(u => u.username === username);

        if(currentUser){
            try{
                const decryptedPassword = await axios.post(`${ServerUrl}/crypt/decrypt`, {texts: new Array(currentUser.password)})
                if(password === decryptedPassword.data.decrypted[0]){
                    sessionStorage.setItem('USER', JSON.stringify(currentUser));
                    setIsToHome(true)
                }else{
                    setMessage('Username or password wrong...')
                }
            }catch(err){
                console.log('error...')
            }
        }else{
            setMessage('Username or password wrong...')
        }
    }

    useEffect(() => { if(isToHome) navigate('/home/') }, [isToHome, navigate])

    return(
        <>
            <main style={{width: '60vmin', height: 'calc(60vmin - 8vmin)'}}>
                <div id="title">
                    <h2>Log in</h2>
                </div>
                <div id="in-container">
                    <input type="text" onChange={(a) => setUsername(a.target.value)} placeholder="Username" />
                    <input type="text" onChange={(a) => setPassword(a.target.value)} placeholder="Password" />
                    <p style={{height: '20px'}}>{message}</p>
                </div>
                <div id="send-container">
                    <button onClick={() => Validate()}>Log in</button>
                    <button className="or" onClick={() => navigate('/signin')}>or sign in</button>
                </div>
            </main>
        </>
    )
}

export default Login
