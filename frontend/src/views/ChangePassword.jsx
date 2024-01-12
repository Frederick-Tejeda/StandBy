import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const ServerUrl = 'https://stand-by.onrender.com';

const ChangePassword = () => {

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [repeatNewPassword, setRepeatNewPassword] = useState('')
    const [message, setMessage] = useState('')

    const USER = JSON.parse(sessionStorage.getItem('USER'));

    const navigate = useNavigate()

    const UpdateUser = async (pass) => {
        let newUser = USER
        newUser.password = pass
        await axios.put(`${ServerUrl}/users/${USER._id}`, newUser)
        sessionStorage.setItem('USER', '{}')
        navigate('/login')
    }

    const Change = async () => {
        if(oldPassword.length < 1 || newPassword.length < 1 || repeatNewPassword.length < 1){ setMessage('One or more fields are empty...'); return }
        if(oldPassword === newPassword && newPassword === repeatNewPassword){ setMessage('Old and new password are the same...'); return}
        
        try{
            const decryptedPassword = await axios.post(`${ServerUrl}/crypt/decrypt`, {texts: new Array(USER.password)})
            if(oldPassword === decryptedPassword.data.decrypted[0]){
                if(newPassword === repeatNewPassword){
                    const encryptedPassword = await axios.post(`${ServerUrl}/crypt/encrypt`, {texts: new Array(newPassword)})
                    UpdateUser(encryptedPassword.data.encrypted[0])
                }else{
                    setMessage(`Passwords doesn't match...`)
                }
            }else{
                setMessage('Old password is wrong...')
                return
            }
        }catch(err){
            console.log('try/catch error')
        }
    }

    return(
            <>
                <main>
                    <div id="title">
                        <h2>Change password</h2>
                    </div>
                    <div id="in-container">
                        <input id="oldPassword" onChange={(a) => setOldPassword(a.target.value)} placeholder="Old password"/>
                        <input id="newPassword" onChange={(a) => setNewPassword(a.target.value)} placeholder="New password"/>
                        <input id="repeatNewPassword" onChange={(a) => setRepeatNewPassword(a.target.value)} placeholder="Repeat new password"/>
                        <p style={{height: '20px'}}>{message}</p>
                    </div>
                    <div id="send-container">
                        <button onClick={() => Change()}>Change password</button>
                        <button className="or" onClick={() => navigate(-1)}>Or keep same password</button>
                    </div>
                </main>
            </>
    )

}

export default ChangePassword
