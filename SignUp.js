import React, { useState } from 'react'
import './SignUp.css'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { handleError,handleSuccess } from '../../Utils/Logger'

const SignUp = () => {
    const [userInfo, setUserInfo] = useState({
        name: "",
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
        const { name, email, password } = userInfo;
        if (!name || !email || !password) {
            return handleError("Missing email , password or name")
        }
        const url = 'http://localhost:8080/auth/signup'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(userInfo)
        })
        const result = await response.json()
        const { message, success, error } = result
        
        if (success) {
            handleSuccess(message)
            setTimeout(() => {
                navigate('/login')
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
                    <h1>SignUp Form</h1>

                    <div>
                        <label htmlFor='name'>Name:&nbsp;</label>
                        <input
                            onChange={handleChange}
                            type='text'
                            name='name'
                            placeholder='Enter your name'
                            value={userInfo.name}
                            //onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                            autoFocus
                        />
                    </div>

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

                    <button type='submit'>SignUp</button>
                    <br />
                    <span>
                        Already have an account? <Link to='/login'>Login</Link>
                    </span>
                </form>

                <ToastContainer />
            </div>
        </>
    )
}

export default SignUp
