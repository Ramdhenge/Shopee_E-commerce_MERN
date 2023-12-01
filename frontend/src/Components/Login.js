import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import login_img from '../icon/login.svg'

const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            navigate('/')
        }
        else {
            props.showAlert("Invalid Credentials", "danger");
        }

    }

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container login-container'>
            <form onSubmit={handleSubmit} className='w-75'>
                <h3 className='my-4'>LogIn</h3>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" onChange={onchange} className="form-control" id="email" name='email' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" onChange={onchange} className="form-control" name='password' id="exampleInputPassword1" min={3} />
                </div>
                <div className="form-text mb-3">Don't have an Account? <NavLink to='/signup'>SignUp</NavLink></div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <div className="">
                <img className='login_img' src={login_img} alt="" />
            </div>
        </div>
    )
}

export default Login
