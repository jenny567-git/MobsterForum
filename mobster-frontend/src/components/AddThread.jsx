import React from 'react'
import logo from '../assets/Mobster-logo.png'


function AddThread() {
    return (
        <div className="add-thread">
            <img src={logo} alt="profile picture" />
            <textarea name="addThread" cols="70" rows="5" placeholder="Create a Thread..."></textarea>
        </div>
    )
}

export default AddThread
