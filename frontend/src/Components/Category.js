import React, { useContext } from 'react'
import ProductContext from '../Context/ProductContext'
import ProductItem from './ProductItem'

const Category = () => {

  const contex = useContext(ProductContext)
  const { categoryProducts, viewproduct} = contex

  return (
    <div className='container'>
      <div className='row my-3'>
            <h3>All Products</h3>
            <div className='container my-3'>
                <div className='allproducts'>
                    {categoryProducts.map((product) => {
                        return <ProductItem key={product._id} product={product} viewproduct={viewproduct}/>
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Category