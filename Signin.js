import React, { useState } from 'react'
import './SignIn.css'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { handleError,handleSuccess } from '../../Utils/Logger'

const Signin = () => {
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        //console.log(name,value)
        const copysignInfo = { ...userInfo }
        copysignInfo[name] = value
        setUserInfo(copysignInfo)
    }
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email, password } = userInfo;
        if (!email || !password) {
            return handleError("Missing email or password ")
        }
        const url = 'http://localhost:8080/auth/login'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(userInfo)
        })
        const result = await response.json()
        const { message, success, error,token } = result
         

        if (success) {
            handleSuccess(message)
            localStorage.setItem('token', token);
                //localStorage.setItem('loggedInUser');
            setTimeout(() => {
                navigate('/home')
            }, 1000)
        }
        else if (error) {
            const details = error?.details[0].message;
            handleError(details)
        }
        else if (!success) {
            handleError(message)
        }
        console.log(result)
    }

    return (
        <>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <h1>Login Form</h1>

                    <div>
                        <label htmlFor='email'>Email:&nbsp;</label>
                        <input
                            type='email'
                            name='email'
                            placeholder='Enter your email'
                            value={userInfo.email}
                            onChange={handleChange}
                        //onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label htmlFor='password'>Password:&nbsp;</label>
                        <input
                            type='password'
                            name='password'
                            placeholder='Enter your password'
                            value={userInfo.password}
                            onChange={handleChange}
                        //onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                        />
                    </div>

                    <button type='submit'>Login</button>
                    <br />
                    <span>
                        Dont have any account? <Link to='/signup'>Signup</Link>
                    </span>
                </form>

                <ToastContainer />
            </div>
        </>
    )
}

export default Signin
