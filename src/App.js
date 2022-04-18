import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './component/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Error from './pages/Error';


export default class App extends Component {
  render() {
  
    return (
      // <div style={{backgroundColor: 'blue'}}>
      <Router>
        <Navbar/>

        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact  path='/cart' element={<Cart/>}/>
          <Route exact  path='/product/:id' element={<ProductDetails/>}/>
          <Route exact  path='*' element={<Error/>}/>
        </Routes>
        
      </Router>
      // </div>
    )
  }
}

 
 
  


