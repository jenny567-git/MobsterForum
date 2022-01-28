import React from 'react';
import  "./Post-styling.css"
import logo from '../../assets/Mobster-logo.png'
import { Button } from 'react-bootstrap';
import useFetch from '../../CustomHooks/useFetch';

export const Post = ({ id }) => {
  const { data: posts, error, isPending } = useFetch(`https://localhost:44304/api/Posts/thread/${id}`);
  
    return <div>
            
            { isPending && <div>Loading posts...</div> }

            { error && <div>There are no posts on this thread yet...</div> }

            { posts && posts.map((post) => 
                <div className='single-post'>
                    <div className="avatar-container">
                        <img className='avatar' src={logo} alt="profile picture" />
                    </div>
                    
                    <div className="post-content">
                        <p className='post-metadata'>Posted by <strong className='post-metadata-bold'>{ post.author.userName }</strong> at { post.createdAt }</p>
                        <p>{ post.content }</p>
                    </div>
                    
                    <div className="post-buttons">
                        <Button className='post-btn' title='Flag post as inappropriate'><i class="fas fa-flag"></i></Button>
                        <Button className='post-btn' title='Censor post content'><i class="fas fa-comment-slash"></i></Button>
                    </div>
                </div>
            )}
        
        </div>;
};
