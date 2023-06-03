import { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import WebFont from "webfontloader";
import { Routes, Route } from "react-router-dom";
import Test from './component/Test';
import Header from './component/layout/Header/Header.js'
import Footer from './component/layout/Footer/Footer.js'
import Home from './component/home/Home.js'
import Products from './component/Products/Products.js'
import ProductDetails from './component/product/ProductDetails.js'
import Search from './component/product/Search.js'


// import Loader from './component/layout/Loader/Loader';
// import Aleart from './component/layout/Aleart/Aleart.js';
function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", 'Droid Sans', 'Droid Serif']
      }
    });

  },)

  return (
    <Router>
      <Header></Header>
      <Routes> 
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/products/:keyword' element={<Products/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/test' element={<Test/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>

      </Routes>


      <Footer></Footer>
    </Router>

  );
}

export default App;
