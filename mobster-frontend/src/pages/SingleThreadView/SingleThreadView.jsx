import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { CreatePost } from '../../components/Post/CreatePost';
import { Post } from '../../components/Post/Post';
import useFetch from '../../CustomHooks/useFetch';
import "./SingleThreadView-styling.css"

const SingleThreadView = () => {
  const { id } = useParams();
  const { data: thread, error, isPending } = useFetch(`https://localhost:44304/api/Thread/${id}`);
  // const [isVisible, setVisible] = useState(true);

  const toggleReplyBox = () => {
    // setVisible(!isVisible);
    scrollToBottom();
  }

  function getThreadLink(){
    navigator.clipboard.writeText(window.location.href);
  }

  function scrollToBottom(){
    let scrollingElement = (document.scrollingElement || document.body);
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
  }

  function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
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
                <Button className='thread-btns' title='Share link' onClick={getThreadLink}><i class="fas fa-share-square"></i></Button>
                <Button className='thread-btns' title='Flag thread as inappropriate'><i class="fas fa-flag"></i></Button>
                <Button className='thread-btns' title='Censor thread content'><i class="fas fa-comment-slash"></i></Button>
        </div>

        
        
        <div className="thread-posts">
            <Post id={id} />
        </div>

        {/* <div className={isVisible ? 'thread-reply' : 'invisible'} >
              <CreatePost />
        </div> */}
        <div className='thread-reply' >
              <CreatePost />
        </div>
        

        <Button className='backtotop-button' onClick={scrollToTop}>Back to top</Button>
    </div>
    
</div>;
}

export default SingleThreadView;
