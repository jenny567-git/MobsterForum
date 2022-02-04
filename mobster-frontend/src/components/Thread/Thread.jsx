import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import  "./thread-styling.css"


function Thread({thread}) {
  let navigate = useNavigate();
  

  return (
    <div className="thread-container" onClick={() => navigate(`/thread/${thread.threadId}`)}>
      <div className="thread-title">
        {/* {thread.author ? < p className="thread-metadata">posted by {thread.author.userName} in {thread.familyName} at {thread.createdAt}</p>: */}
        < p className="thread-metadata">posted by {thread.author.userName} in {thread.familyName} at {thread.createdAt}</p>
        <h2>{thread.title}</h2>
      </div>
      {thread.title.length>100 ? <p className="thread-text">{thread.content}</p> : <p className="thread-text">{thread.content.slice(0,100)}...</p>}
      <p className="thread-metadata">Click to go to page</p>
  </div>
  );
  
}

export default Thread;
