import React, { useState } from 'react'
import ProductContext from './ProductContext'
// import { useNavigate } from 'react-router-dom'

const ProductState = (props) => {

  const host = "http://localhost:5000"
  const InitialProducts = []
  const InitialOverview = []
  const CategoryProduct = []
  const InitialCart = []
  const [products, setProducts] = useState(InitialProducts)
  const [overview, setOverview] = useState(InitialOverview)
  const [categoryProducts, setCategoryProducts] = useState(CategoryProduct)
  const [cart, setCart] = useState(InitialCart)
  // const navigate = useNavigate()

  // Get All Products 
  const getproducts = async () => {
    // API call
    let url = `${host}/api/product/getproducts`
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "content-type": "application/json"
      }
    })
    const json = await response.json()
    setProducts(json)
    // console.log(products);
  }

  // Get Products Category wise
  const category = async (categoryname) => {
    let url = `${host}/api/product/getproducts/${categoryname}`
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "content-type": "application/json"
      }
    })
    const json = await response.json()
    setCategoryProducts(json)
  }


  // Get Overview of product
  const viewproduct = async (productId) => {
    let url = `${host}/api/product/viewproduct/${productId}`
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "content-type": "application/json"
      }
    })
    const json = await response.json()
    setOverview(json)
  }

  // Get cart data of logged in user
  const getdata = async () => {
    const response = await fetch('http://localhost:5000/api/auth/mycart', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json()
    setCart(json);
  }
  
  // Remove Item from cart
  const remove = async (productId)=>{
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/product/removefromcart/${productId}`,{
      method: "PUT",
      headers:{
        "Content-Type" : "application/json",
        "auth-token" : localStorage.getItem('token')
      }
    })
    const newCart = cart.filter((product)=>{return product._id !== productId})
    setCart(newCart)
  }

  return (
    <ProductContext.Provider value={{ products, getproducts, viewproduct, overview, category, categoryProducts, getdata, cart, remove }}>
      {props.children}
    </ProductContext.Provider>
  )
}

export default ProductState
