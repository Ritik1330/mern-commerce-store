import React, { Fragment, useEffect, } from 'react'
import "./Home.css"
import { CgMouse } from 'react-icons/cg'
import ProductCard from './ProductCard.js'
import MetaData from '../layout/Footer/MetaData'
import { useDispatch, useSelector } from "react-redux";
import { getProduct,clearErrors } from '../../redux/actions/productsActions'
import Loader from '../layout/Loader/Loader'
import Alert from '../layout/Aleart/Aleart'


export default function Home() {
    const dispatch = useDispatch();
    const { products, productsCounts,error, loading, } = useSelector((state) => state.products)

    useEffect((error) => {
        dispatch(getProduct())
        // if () {
        //     dispatch(clearErrors())
        //    }
    }, [dispatch,error])


    return (

        <Fragment>
            {loading ? <Loader/> : error ? <Alert message={error} /> : 
<Fragment>

    <MetaData title="ECOMMERCE" />
    <div className='banner'>
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCT BELOW</h1>
        <a href="#container">
            <button>
                Scroll<CgMouse />
            </button>
        </a>
    </div>
    <h2 className='homeHeading'> Fetured product</h2>
    <div className='container' id='container'>
        {
            products && products.map(product => (
                <ProductCard product={product} key={product._id} />

            )
            )
        }
    </div>
</Fragment>
            
            
           }
        </Fragment>

    )
}

