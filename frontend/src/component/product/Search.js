import React, { Fragment, useState } from 'react'
import "./search.css"

import { useNavigate } from 'react-router-dom';

export default function Search() {
    const history = useNavigate();
    const [Keyword, setKeyword] = useState("")


    const searchSubmitHandler = (e) => {
        // for stoprelod page
        e.preventDefault()
        if (Keyword.trim()) {
            history(`/products/${Keyword}`)

        } else {
            history('/products');
        }
    }

    return (
        <Fragment>
            <form className='searchBox' onSubmit={searchSubmitHandler}>
                <input type="text"
                    placeholder='search product...'
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input type="submit" value="search" />
            </form>
        </Fragment>
    )
}
