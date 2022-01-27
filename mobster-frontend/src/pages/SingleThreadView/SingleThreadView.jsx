import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Post } from '../../components/Post/Post';
import useFetch from '../../CustomHooks/useFetch';
import "./SingleThreadView-styling.css"

const SingleThreadView = () => {
  const { id } = useParams();
  const { data: thread, error, isPending } = useFetch(`https://localhost:44304/api/Thread/${id}`);
  const [isVisible, setVisible] = useState(false);

  const toggleReplyBox = () => {
    setVisible(!isVisible);
  }
  
  return <div className="SingleThreadView">
    
    <div className="main-container">
        <div className="thread-container">
            { isPending && <div>Loading thread...</div> }
            { error && <h2>Error: no content found.</h2> }
            
            { thread && (<div className="thread">
              <p className="thread-metadata"> 
                Posted by <strong className='thread-metadata-bold'>{thread.author.userName}</strong> in <em className='thread-metadata-bold'>{thread.family.name}</em>  at {thread.createdAt}
              </p>
              
              <h2>{ thread.title}</h2>
              <p>{ thread.content }</p>
              
            </div>
          )}
        </div>
      
        <div className="thread-btns">
                <Button className='thread-btns' title='Post reply' onClick={toggleReplyBox}><i class="fas fa-reply"></i></Button>
                <Button className='thread-btns' title='Flag thread as inappropriate'><i class="fas fa-flag"></i></Button>
                <Button className='thread-btns' title='Censor thread content'><i class="fas fa-comment-slash"></i></Button>
        </div>

        {/* TODO: break out the create post reply to separate component */}
        <div className={isVisible ? 'thread-reply' : 'invisible'} >
              <textarea id="reply-textarea" cols="60" rows="5"></textarea>
              <button>Post reply</button>
        </div>
        
        <div className="thread-posts">
            <Post id={id} />
        </div>
    </div>
    
</div>;
}

export default SingleThreadView;
