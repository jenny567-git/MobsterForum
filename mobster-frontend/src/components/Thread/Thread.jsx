import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import  "./thread-styling.css"


function Thread({thread}) {
  let navigate = useNavigate();
  

  return (
    <div className="thread-container" onClick={() => navigate(`/thread/${thread.threadId}`)}>
      <div className="thread-title">
        {!thread.author.isBanned && thread.author.isActive && < div className="thread-metadata"><span>Posted by <p>{thread.author.userName}</p> in <p>{thread.familyName}</p> at {thread.createdAt}</span></div>} 
        {!thread.author.isBanned && !thread.author.isActive && < div className="thread-metadata"><span>Posted by <p>&#91;Deceased&#93;</p> in <p>{thread.familyName}</p> at {thread.createdAt}</span></div>} 
        {thread.author.isBanned && thread.author.isActive && < div className="thread-metadata"><span>Posted by <p>User &#91;in jail&#93;</p> in <p>{thread.familyName}</p> at {thread.createdAt}</span></div>} 
        {!thread.isCensored && (<h2>{thread.title}</h2>)}
        {thread.isCensored && (<h2>[Silenced]</h2>)}
      </div>
      {!thread.isCensored && (thread.title.length>100 ? <p className="thread-text">{thread.content}</p> : <p className="thread-text">{thread.content.slice(0,100)}...</p>)}
      {thread.isCensored && <p>[This mook disrespected the family; their words are silenced.]</p>}
     
  </div>
  );
  
}

export default Thread;
