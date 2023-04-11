import React, { Fragment, useEffect } from 'react'
import {FaLongArrowAltDown} from "react-icons/fa"
import Product from "./Product"
import MetaData from '../layout/MetaData'
import "./Home.css"
import {getProduct} from "../../actions/productAction"
import {useSelector,useDispatch} from "react-redux"
import Loader from '../layout/loader/Loader'

//for static product demo
// const product = {
//     name:"T -shirt",
//     images:[{url:"https://rukminim1.flixcart.com/image/612/612/xif0q/t-shirt/y/t/k/xxs-t653-cgblwh-eyebogler-original-imaghyjv7kppbqxb.jpeg?q=70"}],
//     price: " Rs 2500",
//     _id:" shyam"
// }


const Home = () => {
    const dispatch = useDispatch()
    const{loading,error,products,productsCount} = useSelector((state)=>state.products)
    
    useEffect(() => {
        dispatch(getProduct())
    }, [dispatch]) 
    
  return (
    <Fragment>
        {loading ? (<Loader/>):(
        <Fragment>
        <MetaData title="Home Page is working"/>

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
            
            {products && products.map(product=>(
                <Product product={product} />
            ))}
        </div>

    </Fragment>)}
    </Fragment>
  )
}

export default Home