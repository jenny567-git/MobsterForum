import React from 'react';
import  "./Post-styling.css"
import logo from '../../assets/Mobster-logo.png'
import { Button } from 'react-bootstrap';

export const Post = () => {
  
    return <div className='single-post'>
            
            <div className="avatar-container">
                <img className='avatar' src={logo} alt="profile picture" />
            </div>
            
            <div className="post-content">
                <p className='post-metadata'>Posted by <strong className='post-metadata-bold'>USERNAME</strong> at CREATEDAT</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem voluptatum sed sequi consectetur distinctio? Aliquid, odio. Natus nesciunt, repudiandae reprehenderit, magni officiis vel culpa corporis eius architecto vitae, laborum commodi.</p>
            </div>
            
            <div className="post-buttons">
                <Button className='post-btn' title='Flag post as inappropriate'><i class="fas fa-flag"></i></Button>
                <Button className='post-btn' title='Censor post content'><i class="fas fa-comment-slash"></i></Button>
            </div>
        
        </div>;
};
