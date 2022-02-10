import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import  "./thread-styling.css"


function Thread({thread}) {
  let navigate = useNavigate();
  

  return (
    <div className="thread-container" onClick={() => navigate(`/thread/${thread.threadId}`)}>
      <div className="thread-title">
        < div className="thread-metadata"><span>Posted by <p>{thread.author.userName}</p> in <p>{thread.familyName}</p> at {thread.createdAt}</span></div>
        <h2>{thread.title}</h2>
      </div>
      {thread.title.length>100 ? <p className="thread-text">{thread.content}</p> : <p className="thread-text">{thread.content.slice(0,100)}...</p>}
     
  </div>
  );
  
}

export default Thread;
