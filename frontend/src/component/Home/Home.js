import React, { Fragment } from 'react'
import {FaLongArrowAltDown} from "react-icons/fa"
import Product from "./Product"
import "./Home.css"


const product = {
    name:"T -shirt",
    images:[{url:"https://rukminim1.flixcart.com/image/612/612/xif0q/t-shirt/y/t/k/xxs-t653-cgblwh-eyebogler-original-imaghyjv7kppbqxb.jpeg?q=70"}],
    price: " Rs 2500",
    _id:" shyam"
}


const Home = () => {
  return (
    <Fragment>
        <div className='banner'>
            <p>Welcome to Ecommerce</p>
            <h1>Find Amazing Products Below</h1>

            <a href='#container'>
                <button>
                    Scroll &nbsp;&nbsp;<FaLongArrowAltDown/>
                </button>

            </a>

        </div>
        <h2 className='homeHeading'>Featured Products</h2>
        <div className='container' id='container'>
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />

            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            
        </div>

    </Fragment>
  )
}

export default Home