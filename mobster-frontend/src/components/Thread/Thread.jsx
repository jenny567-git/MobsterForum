import React from 'react';
import  "./thread-styling.css"

function Thread(props) {
  return <div className="thread-container">
      <div className="thread-title">
        < p className="thread-metadata">posted by {props.username} in {props.familyName} at {props.threadDate}</p>
        <h2>{props.title}</h2>
      </div>
        <p className="thread-text">{props.text}</p>
        <button className="reply-btn">reply</button>
  </div>;
  
}

export default Thread;
