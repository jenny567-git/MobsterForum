import React from 'react'
import { useParams } from 'react-router-dom';
import useFetch from '../../CustomHooks/useFetch';
import "./SingleThreadView-styling.css"

const SingleThreadView = () => {
  const { id } = useParams();
  const { data: thread, error, isPending } = useFetch(`https://localhost:44304/api/Thread/${id}`);
  
  return <div className="SingleThreadView">
    <div className="thread-container">
        { isPending && <div>Loading thread...</div> }
        { error && <h2>Error: no content found.</h2> }
        { thread && (<div className="thread">
          <p className="thread-metadata"> 
            Posted by <strong className='thread-metadata-bold'>{thread.author.userName}</strong> in <em className='thread-metadata-bold'>{thread.family.name}</em>  at {thread.createdAt}
          </p>
          
          <h2>{ thread.title}</h2>
          <p>{ thread.content }</p>
          
          <div className="thread-btns">
            <button>Reply</button>
            <button>Report</button>
          </div>
        </div>
      )}
      <div className="thread-posts">
        
      </div>
      {/* <div className="thread-reply">
        <textarea id="reply-textarea" cols="60" rows="5"></textarea>
        <button>post reply</button>
      </div> */}
  </div>
</div>;
}

export default SingleThreadView;
