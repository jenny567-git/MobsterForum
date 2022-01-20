import React from 'react'
import SearchBar from './SearchBar'
import logo from '../assets/Mobster-logo.png'

function Header() {
    return (
        <div className="header">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="search-bar">
                <SearchBar></SearchBar>
            </div>
            <div className="sign-in">
                <button type="button" >Sign In</button>
                <button type="button" >Register</button>
            </div>
        </div>
    )
}

export default Header
