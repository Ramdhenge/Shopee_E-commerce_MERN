import React from 'react'
import { NavLink } from 'react-router-dom'

const ProductItem = (props) => {

    const { product, viewproduct, cartvalue, remove, showAlert } = props

    return (
            <div className='col-md-4'>
                <div className="card products mx-3 my-3">
                    <div className='img-cnt'>
                        <img src={product.image} className="card-img-top" alt="..." />
                    </div>
                    <div className="card-body">
                        <h6 className="card-title">{product.name}</h6>
                        <h5 className="card-title"> &#8377; {product.price}</h5>
                        <p className="card-text">{product.description.length > 80 ? product.description.slice(0, 80) + "..." : product.description}</p>
                        <NavLink to="/viewproduct" onClick={() => { viewproduct(product._id) }} className="btn btn-primary">View</NavLink>

                        {cartvalue===true && <button onClick={()=>{
                            const cnfrm = window.confirm(`Do you want to remove ${product.name} from cart`)
                            if(cnfrm === true){
                            remove(product._id);
                            showAlert(`${product.name} is removerd from cart`, "success")}
                            else{}
                            }} 
                            className="btn btn-danger mx-2">Remove</button>}
                    </div>
                </div>
            </div>
    )
}

export default ProductItem
