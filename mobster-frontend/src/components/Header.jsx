import React from 'react'
import SearchBar from './SearchBar'
import logo from '../assets/Mobster-logo.png'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <div className="header">
            <div className="logo">
                <Link to="/"><img src={logo} alt="Logo" /></Link>
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
