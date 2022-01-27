import React from 'react';
import { Button } from 'react-bootstrap';
import './CreatePost-styling.css'

export const CreatePost = () => {
  
    return <div className='thread-reply'>
        <textarea className="reply-textarea" cols="60" rows="5"></textarea>
        <button className="reply-button">Post reply</button>
    </div>;
};
