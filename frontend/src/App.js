import React from "react"
import Header from "./component/layout/Header/Header"
import Footer from "./component/layout/Footer/Footer"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./component/Home/Home"
import './App.css';

function App() {
  return (
    <div>
      
      <Header/>
      {/* <h2 style={{textAlign:'center'}}>Welcome to Online Shopping</h2> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
        
        </Routes>
          
      </Router>
      
      <Footer/>
    </div>
  );
}

export default App;
