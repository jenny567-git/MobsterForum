import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Button, Form, Modal } from 'react-bootstrap';
// import { useAuth0 } from '@auth0/auth0-react'; 
import { useLocalStorage } from '../../CustomHooks/useLocalStorage';
// import adminPic from '../../assets/profile-icons/admin.jpg'
import userPic from '../../assets/profile-icons/user.jpg'
import bannedPic from '../../assets/profile-icons/banned.jpg'
import inactivePic from '../../assets/profile-icons/inactive.png'
import  "./Post-styling.css"

export const Post = ({ id , blockedMembers , thread }) => {
  const [posts, setPosts] = useState([]);
  // const {user, isLoading} = useAuth0();
  const [user, setuser] = useLocalStorage('user', null)
  const [newPostContent, setNewPostContent] = useState("");
  const [postToEdit, setPostToEdit] = useState({});
  const [editedPostContent, setEditedPostContent] = useState("");
  const [postToDeleteId, setPostToDeleteId] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

    const fetchPosts = (async () => {
    let response = await axios.get(`https://localhost:44304/api/Posts/thread/${id}`)
    setPosts(response.data)
  })

  const checkIfBlockedFromFamily = ((author) => {
    let blockedMembersIds = blockedMembers.map(m => m.userId)
    return blockedMembersIds.includes(author.userId)
  })
  function log(){
    console.log(thread);
  }
  const checkIfUserInFamily = (() => {
    if(thread){
      let familyMembersIds = thread.family.familyMembers.map(m => m.userId)
      return familyMembersIds.includes(user.userId)
    }
  })

  const submitNewPost = async () => {
    let newPost = {
        authorUserId: user.userId,
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

  const handleCloseEdit = () => setShowEditModal(false);
  
  const handleShowEdit = (post) => {
    setPostToEdit(post);
    setShowEditModal(true);
  } 
  
  const saveEditedPost = async (postId) => {
    
    let editedPost = {
      authorUserId: postToEdit.authorUserId,
      threadId: id,
      content: editedPostContent 
  }
    
    await axios
    .put(`https://localhost:44304/api/Posts?postId=${postId}`, editedPost)
    .catch((error) => {
      console.error("Error:", error);
    });

    fetchPosts();
    setShowEditModal(false);
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

    const toggleCensorPost = async (postId) => {
      await axios
        .put(`https://localhost:44304/api/Posts/censor/${postId}`)
        .catch((error) => {
          console.error("Error:", error);
        });

      fetchPosts();
    }


useEffect(()=>{
    fetchPosts();
  },[])
  
// if(isLoading){
//     return <div> <p>Loading page...</p></div>
//   }
    return <div>

            { !posts && <p>There are no posts on this thread yet...</p> }

            { posts && posts.map((post) => 
                <div className='single-post' key={post.postId}>
                    <div className="avatar-container">
                    {!post.author.isBanned && !checkIfBlockedFromFamily(post.author)&& post.author.isActive && <img className='avatar' src={userPic} alt="profile picture" />}
                    {(post.author.isBanned || checkIfBlockedFromFamily(post.author)) && post.author.isActive && <img className='avatar' src={bannedPic} alt="profile picture" />}
                    {!post.author.isActive && !post.author.isBanned && <img className='avatar' src={inactivePic} alt="profile picture" />}
                    </div>
                    
                    <div className="post-content">
                        
                        {post.author.isBanned && post.author.isActive && <p className='post-metadata'>Posted by <strong className='post-metadata-bold'>{post.author.userName} &#91;In Jail&#93; </strong> at {post.createdAt}</p>}
                        {!post.author.isActive && !post.author.isBanned && <p className='post-metadata'>Posted by <strong className='post-metadata-bold'>&#91;Deceased&#93;</strong> at {post.createdAt}</p>}
                        {!post.author.isBanned && post.author.isActive && <p className='post-metadata'>Posted by <strong className='post-metadata-bold'>{post.author.userName}</strong> at {post.createdAt}</p>}
                        
                        {!post.isCensored && <p>{post.content}</p>}
                        {post.isCensored && <p className='censored-post'>&#91;This mook disrespected the family; their words are silenced.&#93;</p>}
                        
                    </div>
                    
                    <div className="post-buttons">
                        {!checkIfBlockedFromFamily(user) && post.author.userId == user.userId && 
                        <div>
                            <Button className='post-btn' onClick={() => handleShowEdit(post)}><i className='fas fa-edit' title="Edit post"></i></Button>
                            <Button className='post-btn' title='Delete post' onClick={() => handleShowDelete(post.postId)}><i className="fas fa-trash-alt"></i></Button>
                        </div>}
                        {!checkIfBlockedFromFamily(user) && post.author.userId != user.userId && !user.roles.includes("admin") && <Button className='post-btn' title='Report post'><i className="fas fa-exclamation"></i></Button>}
                        {!checkIfBlockedFromFamily(user) && user.roles.includes("admin") && post.author.userId != user.userId && (<Button className='post-btn' onClick={() => toggleCensorPost(post.postId)} title='Censor post content'><i className="fas fa-comment-slash"></i></Button>)}
                        
                    </div>
                </div>
            )}

                  {checkIfUserInFamily() && <div className='thread-reply'>
                          <Form.Control
                            className="reply-textarea"
                            as="textarea"
                            cols="60" 
                            rows="5"
                            placeholder="Your reply..."
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                          />
                          <Button className="reply-button" onClick={submitNewPost}><p>Post reply</p></Button>
                  </div>}

                  {/* Delete modal */}
                  <Modal show={showDeleteModal} onHide={handleCloseDelete} className="delete-modal">
                        <Modal.Header closeButton>
                          <Modal.Title><h4>Are you sure you want to delete this post?</h4> </Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleCloseDelete}>
                              <p>Cancel</p> 
                          </Button>
                          <Button variant="danger" onClick={() => deletePost(postToDeleteId)}>
                              <p>Delete</p> 
                          </Button>
                        </Modal.Footer>
                  </Modal>

                  {/* Edit modal */}
                  <Modal 
                  show={showEditModal} 
                  onHide={handleCloseEdit}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  >
                        <Modal.Header closeButton>
                          <Modal.Title><h4>Edit post</h4></Modal.Title>
                        </Modal.Header>
                          <Form.Control 
                          as="textarea"
                          rows="5"
                          onChange={(e) => setEditedPostContent(e.target.value)}
                          >{postToEdit.content}</Form.Control>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleCloseEdit}>
                            <p>Close</p> 
                          </Button>
                          <Button variant="primary" onClick={() => saveEditedPost(postToEdit.postId)}>
                            <p>Save Changes</p>
                          </Button>
                        </Modal.Footer>
                  </Modal>
        </div>;
};

export default Post;
