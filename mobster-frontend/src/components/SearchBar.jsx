import React from 'react'

function SearchBar() {
    return (
        <div className="search-bar-input">
            <input type="text" placeholder="Search..." autoComplete="off"/>
            <button type="button"><i className="fas fa-search"></i></button>
        </div>
    )
}

export default SearchBar
