import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return <div className='footer'>
        <div className='footer-left'>
          &copy; Mobster 2022
        </div>

        <div className='footer-middle'>
            <nav>
              <Link to="/"> Home</Link> | 
              <Link to="/about"> About</Link> | 
              <Link to="/faq"> FAQ</Link>
            </nav>
        </div>

        <div className='footer-right'>
          Created with <a href='https://reactjs.org/' target="blank">React</a>
        </div>
  </div>;
};