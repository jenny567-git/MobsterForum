import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Button, Form, Modal } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react'; 
import logo from '../../assets/Mobster-logo.png'
import  "./Post-styling.css"

export const Post = ({ id }) => {
  const [posts, setPosts] = useState([]);
  const {user, isLoading} = useAuth0();
  const [newPostContent, setNewPostContent] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

    const fetchPosts = (async () => {
    let response = await axios.get(`https://localhost:44304/api/Posts/thread/${id}`) 
    setPosts(response.data)
  })

  const submitNewPost = async () => {
    let newPost = {
        authorUserId: "8E4FB1ED-0570-4FE1-B2F9-3882ABDE9DC7", //don't forget to remove hardcoded author user id when we have solution to auth0 id problem
        threadId: id,
        content: newPostContent 
    }

    await axios
    .post(`https://localhost:44304/api/Posts`, newPost)
    .then((res) => {
        console.log("Success: ", res.data);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
    setNewPostContent("");
    fetchPosts();
  };

    const editPost = async (postId) => {
      console.log(postId)
  }

  const handleCloseDelete = () => setShowDeleteModal(false);
  const handleShowDelete = () => setShowDeleteModal(true);  
  
  const deletePost = async (postId) => {
      handleShowDelete();
    
    //   await axios
    //   .delete(`https://localhost:44304/api/Posts?postId=${postId}`)
    //   .catch((error) => {
    //     console.error("Error:", error);
    // });
      
    // fetchPosts();

    }


useEffect(()=>{
    fetchPosts();
  },[])
  
if(isLoading){
    return <div> <p>Loading page...</p></div>
  }
    return <div>

            {/* { error && <div>There are no posts on this thread yet...</div> } */}

            { posts && posts.map((post) => 
                <div className='single-post' key={post.postId}>
                    <div className="avatar-container">
                        <img className='avatar' src={logo} alt="profile picture" />
                    </div>
                    
                    <div className="post-content">
                        <p className='post-metadata'>Posted by <strong className='post-metadata-bold'>{ post.author.userName }</strong> at { post.createdAt }</p>
                        <p>{ post.content }</p>
                    </div>
                    
                    <div className="post-buttons">
                        {post.author.authId == user.sub && 
                        <div>
                            <Button className='post-btn' onClick={() => editPost(post.postId)}><i className='fas fa-edit' title="Edit post"></i></Button>
                            <Button className='post-btn' title='Delete post' onClick={() => deletePost(post.postId)}><i className="fas fa-trash-alt"></i></Button>
                        </div>}
                        {post.author.authId != user.sub && <Button className='post-btn' title='Report post'><i className="fas fa-exclamation"></i></Button>}
                        
                    </div>
                </div>
            )}

                  <div className='thread-reply'>
                          <Form.Control
                            className="reply-textarea"
                            as="textarea"
                            cols="60" 
                            rows="5"
                            placeholder="Your reply..."
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                          />
                          <Button className="reply-button" onClick={submitNewPost}>Post reply</Button>
                  </div>

                  <Modal show={showDeleteModal} onHide={handleCloseDelete}>
                      <Modal.Header closeButton>
                        <Modal.Title>Confirm deletion</Modal.Title>
                      </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                      Close
                    </Button>
                    <Button variant="danger" onClick={handleCloseDelete}>
                      Delete post
                    </Button>
                    </Modal.Footer>
                  </Modal>
        
        </div>;
};

export default Post;
