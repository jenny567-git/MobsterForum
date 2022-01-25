import React from 'react'
import logo from '../../assets/Mobster-logo.png'
import './add-thread-styling.css'



function AddThread() {

    
    return (
        <div className="add-thread">
            
            <img src={logo} alt="profile picture" />
            <div className="thread-text">
                <div className="family-select">
                    <label htmlFor="family-selection">Choose a Family:</label>
                    <select name="family-selection">
                        <option >family 1</option>
                        <option >family 2</option>
                        <option >family 3</option>
                        <option >family 4</option>
                    </select> 
                </div>
                <input type="text" placeholder="Title"/>
                <textarea placeholder="Text" name="thread-content"cols="70" rows="4"></textarea>
                <button className="post-button">Post</button>
            
            </div>
        </div>
    )
}

export default AddThread
