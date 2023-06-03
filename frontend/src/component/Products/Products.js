import React, { useEffect, Fragment, useState } from "react";
import "./products.css";
import ProductCard from "../home/ProductCard.js";
// import MetaData from '../layout/Footer/MetaData'
import { useDispatch, useSelector } from "react-redux";
import { getProduct, clearErrors } from "../../actions/productActions";
import Loader from "../layout/Loader/Loader";
import Alert from "../layout/Aleart/Aleart";
import { useParams } from "react-router-dom";
import { current } from "@reduxjs/toolkit";
import ReactPaginate from 'react-paginate';
function Products() {
    const dispatch = useDispatch();
    const params = useParams();
    let keyword = params.keyword

    const [currentPage, setcurrentPage] = useState()

    const { products, productsCounts, error, loading, resultperpage } = useSelector(
        (state) => state.products
    );
    let pageCount = Math.ceil(productsCounts / resultperpage);

    console.log("pageCount")
    console.log(pageCount)
    console.log(currentPage)
    const handlePageClick = (event) => {
        setcurrentPage(event.selected+1)
    }


    useEffect(
        (error) => {
            dispatch(getProduct(keyword, currentPage));
            // if () {
            //     dispatch(clearErrors())
            //    }

            console.log("useefect call")
        },
        [dispatch, error, currentPage, keyword]
    );

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : error ? (
                <Alert message={error} />
            ) : (
                <Fragment>
                    <h2 className="productHeading">Products</h2>

                    <div className="products">
                        {products &&
                            products.map((product) => (
                                <ProductCard product={product} key={product._id} />
                            ))}
                    </div>



                    {/* <div className="paginationBox">
                        <Pagination
                           activePage={currentPage}
                           itemsCountPerPage={resultperpage}
                           totalItemsCount={productsCounts}
                        //    pageRangeDisplayed={5}
                           onChange={setCurrentPageNo}
                        />
                    </div> */}

                </Fragment>
            )}


            
<div className="paginationBox">


<ReactPaginate
    previousLabel={'previous'}
    nextLabel={'next'}
    breakLabel={'...'}
    breakClassName={'break-me'}
    pageCount={pageCount}
    marginPagesDisplayed={2}
    pageRangeDisplayed={5}
    onPageChange={handlePageClick}
    containerClassName={'pagination'}
    subContainerClassName={'pages pagination'}
    activeClassName={'active'}
    className ="ultag"
    pageClassName="litag"
    previousClassName ="atag"
    nextClassName ="atag"
    previousLinkClassName = "atag"
    nextLinkClassName = "atag"
    pageLinkClassName ="atag1"
    activeLinkClassName="active"
/>
   
  
</div>

        </Fragment>
    );
}

export default Products;
