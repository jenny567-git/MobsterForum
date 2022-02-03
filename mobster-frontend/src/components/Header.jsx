import React from 'react'
import SearchBar from './Search/SearchBar'
import logo from '../assets/Mobster-logo.png'
import { Link } from 'react-router-dom'
import LoginButton from './LoginButton'


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
                <LoginButton />
                
            
            </div>
        </div>
    )
}

export default Header
