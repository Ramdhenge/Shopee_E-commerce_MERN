import React, { useContext, useEffect } from 'react'
import ProductItem from './ProductItem'
import ProductContext from '../Context/ProductContext'

const Products = () => {

    const context = useContext(ProductContext)
    const { products, getproducts, viewproduct } = context

    useEffect(() => {
        getproducts()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className='row my-5'>
                    <h2 className='text-center my-3'>All Products</h2>
                <div className='container my-3'>
                    <div className='allproducts'>
                        {products.map((product) => {
                            return <ProductItem key={product._id} product={product} viewproduct={viewproduct} />
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products
