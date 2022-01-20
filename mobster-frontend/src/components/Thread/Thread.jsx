import React from 'react';
import  "./thread-styling.css"

function Thread() {
  return <div className="thread-container">
      <div className="thread-title">
        <p className="thread-metadata">posted by UserName in FamilyName at Created at Date</p>
        <h2>Title</h2>
      </div>
        <p className="thread-text">thread text</p>
        <button className="reply-btn">reply</button>
  </div>;
  
}

export default Thread;
