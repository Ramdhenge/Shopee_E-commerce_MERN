import React from 'react'
import Products from './Products'
import Carousel from './Carousel'
import img1 from '../img/img1.png'
import img2 from '../img/img2.png'
import img3 from '../img/img3.png'

const Home = () => {
  return (
    <>
      <Carousel img1={img1} img2={img2} img3={img3} />
      <div className='container my-4'>
        <Products />
        {/* <h3>Home</h3> */}
      </div>
    </>
  )
}

export default Home
