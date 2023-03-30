import React from 'react'
import playStore from "../../../images/playstore.png"
import AppStore from "../../../images/Appstore.png"
import "./Footer.css"

const Footer = () => {
  return (
    <footer>
        <div className='leftFooter'>
            <h4>Download our App</h4>
            <p>Download app for android and ios</p>
            <img src={playStore} alt="playstore"/>
            <img src={AppStore} alt="Appstore"/>

        </div>

        <div className='middleFooter'>
            <h1>Ecommerce</h1>
            <p>Best Customer Service is Our Priority</p>
            
            <p>Copyrights 2023 &copy; Ecommerce</p>
        </div>

        <div className='rightFooter'>
            <h4>Follow Us</h4>
            <a href='https://www.facebook.com'>Facebook</a>
            <a href='https://www.instagram.com'>Instagram</a>
            <a href='https://www.youtube.com'>Youtube</a>
        </div>
    </footer>
  )
}

export default Footer