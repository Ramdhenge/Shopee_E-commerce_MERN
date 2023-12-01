import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import ProductContext from '../Context/ProductContext'
import account from '../icon/account.svg'
import cartIcon from '../icon/cart_icon.svg'
import logo from '../img/logo.png'

const Nav = (props) => {

    const context = useContext(ProductContext)
    const { category, cart } = context
    const navigate = useNavigate()

    // useEffect(()=>{
    //     getdata()
    // })

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
        props.showAlert("Logged out successfully!", "success")
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary ">
                <div className="container-fluid">
                    <NavLink to='/' className="navbar-brand" ><img src={logo} className='logo mx-3' alt="" /></NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav mx-3">
                            <NavLink to='/' className="nav-link mx-3" aria-current="page" >Home</NavLink>
                            <div className='nav-item dropdown mx-3'>
                                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Category
                                </a>
                                <ul className="dropdown-menu">
                                    <li><NavLink to='/category' onClick={() => { category("Electronics") }} className="dropdown-item" >Electronics</NavLink></li>

                                    <li><NavLink to='/category' onClick={() => { category("Book") }} className="dropdown-item" >Books</NavLink></li>

                                    <li><NavLink to='/category' onClick={() => { category("Pharmacy") }} className="dropdown-item" >Pharmacy</NavLink></li>
                                </ul>
                            </div>
                            {localStorage.getItem('token') && <NavLink to='/mycart' className="position-relative nav-link mx3" aria-current="page" >My cart <img className='cart-icon' src={cartIcon} alt="" />
                                {<span className={cart.length===0?`d-none`:`position-absolute top-25 start-100 translate-middle badge rounded-pill bg-danger`}>
                                    {cart.length}
                                    <span className="visually-hidden">unread messages</span>
                                </span>}</NavLink>}
                        </div>
                    </div>
                    <div className="login-signup">
                        <div className="btn-group dropstart">
                            <button type="button" className="btn " data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={account} alt="" />
                            </button>
                            {!localStorage.getItem('token') ? <ul className="dropdown-menu">
                                <li><NavLink to='/login' className="dropdown-item" >LogIn</NavLink></li>
                                <li><NavLink to="/signup" className="dropdown-item" >SignUp</NavLink></li>
                            </ul>
                                :
                                <ul className="dropdown-menu">
                                    <li><button className="dropdown-item" onClick={handleLogout} >Logout</button></li>
                                </ul>
                            }
                        </div>
                    </div>
                </div>
            </nav >
        </div >
    )
}

export default Nav
