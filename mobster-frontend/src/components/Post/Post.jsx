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
  const [postToDeleteId, setPostToDeleteId] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

    const fetchPosts = (async () => {
    let response = await axios.get(`https://localhost:44304/api/Posts/thread/${id}`) 
    setPosts(response.data)
  })

  const submitNewPost = async () => {
    let newPost = {
        authorUserId: user["https://rules.com/claims/user_metadata"].uuid,
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
  const handleShowDelete = (postId) => {
      setShowDeleteModal(true);
      setPostToDeleteId(postId); 
  }
  
  const deletePost = async (postId) => {
    
      await axios
      .delete(`https://localhost:44304/api/Posts?postId=${postId}`)
      .catch((error) => {
        console.error("Error:", error);
    });

    setPostToDeleteId("");
    setShowDeleteModal(false);
    fetchPosts();

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
                            <Button className='post-btn' title='Delete post' onClick={() => handleShowDelete(post.postId)}><i className="fas fa-trash-alt"></i></Button>
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
                          <Button variant="danger" onClick={() => deletePost(postToDeleteId)}>
                            Delete post
                          </Button>
                        </Modal.Footer>
                  </Modal>
        
        </div>;
};

export default Post;
