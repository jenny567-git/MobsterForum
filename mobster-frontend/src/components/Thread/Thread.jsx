import React from 'react';
import  "./thread-styling.css"


function Thread({thread}) {
  console.log(thread);
  return <div className="thread-container">
      <div className="thread-title">
        {/* {thread.author ? < p className="thread-metadata">posted by {thread.author.userName} in {thread.familyName} at {thread.createdAt}</p>: */}
        < p className="thread-metadata">posted by {thread.author.userName} in {thread.familyName} at {thread.createdAt}</p>
        <h2>{thread.title}</h2>
      </div>
      {thread.title.length>100 ? <p className="thread-text">{thread.content}</p> : <p className="thread-text">{thread.content.slice(0,100)}...</p>}
  </div>;
  
}

export default Thread;
