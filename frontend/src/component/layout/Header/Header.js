import React from 'react'
import {FaSearch,FaCartArrowDown,FaUser } from "react-icons/fa";
import "./Header.css"

const Header = () => {
  return (
    <div>
        
        <ul>
  <li><a className="active" href="#home">Home</a></li>
  <li><a href="#news">Product</a></li>
  <li><a href="#news">Contact</a></li>
  <li><a href="#contact">Services</a></li>
  <li><a href="#about">About</a></li>
  <li><a href="#news">Blog</a></li>
  <div className="right">
  <li><a href="#about"><FaSearch /></a></li>
  <li><a href="#about">< FaCartArrowDown/></a></li>
  <li><a href="#about"><FaUser /></a></li>
  </div>
</ul>



    </div>
  )
}

export default Header



