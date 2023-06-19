import React, { useEffect, Fragment, useState } from "react";
import "./products.css";
import ProductCard from "../home/ProductCard.js";
// import MetaData from '../layout/Footer/MetaData'
import { useDispatch, useSelector } from "react-redux";
import { getProduct, clearErrors } from "../../redux/actions/productActions";
import Loader from "../layout/Loader/Loader";
import Alert from "../layout/Aleart/Aleart";
import { useParams } from "react-router-dom";
import { current } from "@reduxjs/toolkit";
import ReactPaginate from "react-paginate";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";

const Categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "camera",
    "Smartphone",
];

function Products() {
    const dispatch = useDispatch();
    const params = useParams();
    let keyword = params.keyword;

    const [currentPage, setcurrentPage] = useState();
    const [Category, setCategory] = useState();
    const [price, setprice] = React.useState([0, 25000]);
    const [rating, setrating] = useState();

    const handleChange = (event, newPrice) => {
        setprice(newPrice);
    };
    const handleRating = (event, newRating) => {
        setrating(newRating);
    };

    const {
        products,
        productsCounts,
        error,
        loading,
        resultperpage,
        filterdProductCount,
    } = useSelector((state) => state.products);
    let pageCount = Math.ceil(filterdProductCount / resultperpage);

    const handlePageClick = (event) => {
        setcurrentPage(event.selected + 1);
    };

    useEffect(
        (error) => {
            dispatch(getProduct(keyword, currentPage, price, Category,rating));
            // if () {
            //     dispatch(clearErrors())
            //    }

            console.log("useefect call");
        },
        [dispatch, error, currentPage, keyword, price, Category,rating]
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

                    <div className="filterBox">
                        <Typography>Price</Typography>
                        <Slider
                            getAriaLabel={() => "Temperature range"}
                            value={price}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            // getAriaValueText={valuetext}
                            min={0}
                            // step={1}
                            max={25000}
                        />
                        <Typography>Categories</Typography>
                        <ul className="categorybox">
                            {Categories.map((Category) => (
                                <li
                                    className="Category-link"
                                    key={Category}
                                    onClick={() => setCategory(Category)}
                                >
                                    {Category}
                                </li>
                            ))}
                        </ul>
                        <fieldset>
                            <Typography component="legend" >Ratings Above</Typography>
                            <Slider
                             value={rating}
                                size="small"
                                defaultValue={0}
                                aria-label="Small"
                                valueLabelDisplay="auto"
                                onChange={handleRating}
                                min={0}
                                max={5}
                            />
                        </fieldset>
                    </div>

                </Fragment>
            )}

            {resultperpage < filterdProductCount && (
                <div className="paginationBox">
                    <ReactPaginate
                        previousLabel={"previous"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                        className="ultag"
                        pageClassName="litag"
                        previousClassName="atag"
                        nextClassName="atag"
                        previousLinkClassName="atag"
                        nextLinkClassName="atag"
                        pageLinkClassName="atag1"
                        activeLinkClassName="active"
                    />
                </div>
            )}
        </Fragment>
    );
}

export default Products;
