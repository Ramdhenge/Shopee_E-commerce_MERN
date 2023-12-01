import React, { useContext, useEffect } from 'react'
import ProductContext from '../Context/ProductContext'
import ProductItem from './ProductItem'
import empty_cart from '../img/empty-cart.png'

const Mycart = (props) => {

    const context = useContext(ProductContext)
    const { cart, viewproduct, getdata, remove } = context

    useEffect(() => {
        getdata()
        // eslint-disable-next-line
    }, [])
    // console.log(cart);
    return (
        <div className='container'>
            <div className='row my-3'>
                <h3>My Cart</h3>
                <div className='container my-3'>
                    <div className='allproducts'>
                        {cart.length === 0 ? 
                        <div className='container '>
                            <h5>Cart is Empty</h5>
                            <img className='empty-cart' src={empty_cart} alt="" />
                        </div> 
                        : cart.map((product) => {
                            return <ProductItem key={product._id} product={product} remove={remove} cartvalue={true} viewproduct={viewproduct} showAlert={props.showAlert} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mycart