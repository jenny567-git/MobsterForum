import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return <div className='footer'>
        <div className='footer-left'>
          <p>&copy; Mobster 2022</p>
        </div>

        <div className='footer-middle'>
            <nav>
              <Link to="/"> Home</Link> | 
              <Link to="/about"> About</Link> | 
              <Link to="/faq"> FAQ</Link> | 
              <Link to="/contact"> Contact or Report</Link>
            </nav>
        </div>

        <div className='footer-right'>
          <p>Created with <a href='https://reactjs.org/' target="blank">React</a></p>
        </div>
  </div>;
};
