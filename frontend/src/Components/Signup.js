import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import signup_img from '../icon/signup.svg'

const Signup = (props) => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name, email, password, cpassword } = credentials
        if (password === cpassword) {
            const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            });
            const json = await response.json()
            if (json.success) {
                localStorage.setItem('token', json.authtoken)
                props.showAlert("Signed Up Successfully", "success")
                navigate('/')
            }
            else {
                props.showAlert("Please enter valid credentials", "danger")
            }
        }
        else {
            props.showAlert("Password and confirm Password should be matched", "danger")
        }
    }

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container signup-container'>
            <div className='container d-flex justisfy-content-center align-item-center'>
                <form onSubmit={handleSubmit} className='w-75'>
                    <h3 className='my-4'>SignUp</h3>
                    <div className="mb-3">
                        <label htmlFor="exampleInputName" className="form-label">Name</label>
                        <input type="text" onChange={onchange} className="form-control" name='name' id="name" aria-describedby="namelHelp" min={3} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" onChange={onchange} className="form-control" id="email" name='email' aria-describedby="emailHelp" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" onChange={onchange} className="form-control" name='password' id="password" min={3} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type="password" onChange={onchange} className="form-control" name='cpassword' id="exampleInputCPassword1" required />
                    </div>
                    <div className="form-text mb-3">Already have an Account? <NavLink to='/login'>LogIn</NavLink></div>
                    <button type="submit" className="btn btn-primary">Sinup</button>
                </form>
            </div>
            <div className="container d-flex align-center justify-content-center">
                <img className='signup_img' src={signup_img} alt="" />
            </div>
        </div>
    )
}

export default Signup
