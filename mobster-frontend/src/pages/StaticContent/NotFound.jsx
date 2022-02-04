import React from 'react';
import { Image } from 'react-bootstrap';
import './StaticContent-styles.css';


export const NotFound = () => {
  return <div>
      <div className="notfound-container">
          <h1>You lost, or what? That page don't exist! Get outta here, ya mook!</h1>
          <Image src="https://i.pinimg.com/236x/ab/b6/0d/abb60d5cb3df67c8e0d48928ac9e0302--deniro-good-fellas.jpg" />
      </div>
      
  </div>;
};

export default NotFound;