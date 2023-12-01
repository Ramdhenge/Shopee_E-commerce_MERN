import React, { useContext } from 'react'
import ProductContext from '../Context/ProductContext'
import { useNavigate } from 'react-router-dom'

const ViewProduct = (props) => {

    const context = useContext(ProductContext)
    const { overview } = context
    const navigate = useNavigate()

    const addtocart = async () => {
        if (localStorage.getItem('token')) {
            const response = await fetch(`http://localhost:5000/api/product/addtocart/${overview._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                }
            });
            const json = await response.json()
            if (json.success) {
                props.showAlert("Added to cart", "success")
            }
            else {
                props.showAlert("Already added to cart", "warning")
            }
        }
        else {
            navigate('/login')
        }
    }


    return (
        <div className='container my-5'>
            <div className="overview-container">
                <div className="left mx-4">
                    <img src={overview.image} alt="" />
                </div>
                <div className="right mx-3 my-3">
                    <h5>{overview.name}</h5>
                    <h4 className='my-3'>&#8377; {overview.price}</h4>
                    <p>{overview.description}</p>
                    <div className="button d-flex mt-3">
                        <button className='btn btn-primary'>Buy Now</button>
                        <button className='btn btn-primary mx-2' onClick={addtocart} >Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewProduct
