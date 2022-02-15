import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Button, Form, Modal } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react'; 
import { useLocalStorage } from '../../CustomHooks/useLocalStorage';
import userPic from '../../assets/profile-icons/user.jpg'
import bannedPic from '../../assets/profile-icons/banned.jpg'
import inactivePic from '../../assets/profile-icons/inactive.png'
import  "./Post-styling.css"
import { getAuthenticationHeader, getAudience } from '../../CustomHooks/useAutenticationHeader';

export const Post = ({ id , blockedMembers , thread }) => {
  const [posts, setPosts] = useState([]);
  const [user, setuser] = useLocalStorage('user', null)
  const [newPostContent, setNewPostContent] = useState("");
  const [postToEdit, setPostToEdit] = useState({});
  const [editedPostContent, setEditedPostContent] = useState("");
  const [postToDeleteId, setPostToDeleteId] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState();
  const {getAccessTokenSilently} = useAuth0();

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
    const token = await getAccessToken();
    const header = getAuthenticationHeader(token);
    await axios
    .post(`https://localhost:44304/api/Posts`, newPost, header)
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
  const handleReport = (post) => {
    setSelectedPost(post);
    setShowReportModal(true);
  } 
  
  const saveEditedPost = async (postId) => {
    
    let editedPost = {
      authorUserId: postToEdit.authorUserId,
      threadId: id,
      content: editedPostContent 
  }
  const token = await getAccessToken();
  const header = getAuthenticationHeader(token);
    await axios
    .put(`https://localhost:44304/api/Posts?postId=${postId}`, editedPost, header)
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
    const token = await getAccessToken();
    const header = getAuthenticationHeader(token);
      await axios
      .delete(`https://localhost:44304/api/Posts?postId=${postId}`, header)
      .catch((error) => {
        console.error("Error:", error);
    });

    setPostToDeleteId("");
    setShowDeleteModal(false);
    fetchPosts();

    }

    const toggleCensorPost = async (postId) => {
      const token = await getAccessToken();
      const url = `https://localhost:44304/api/Posts/censor/${postId}`
      const response = await fetch(url, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      fetchPosts();
    }

    const onReport = async () => {
      setShowReportModal(true);
      let report = {
        subjectUserId: user.userId,
        objectUserId: selectedPost.author.userId,
        reason: reportReason,
        threadId: selectedPost.threadId,
        postId: selectedPost.postId
      };
      
      const token = await getAccessToken();
      const header = getAuthenticationHeader(token);

      await axios.post(`https://localhost:44304/api/Report/`, report, header);
      setIsReported(true);
      setReportReason("");
      setTimeout(() => {
        setIsReported(false);
        setShowReportModal(false);
      }, 2500);
    };

    
const getAccessToken = async () => {
  const audience = getAudience();
  const token = await getAccessTokenSilently({
    audience: audience,
  });
  return token;
}

useEffect(()=>{
    fetchPosts();
  },[])
  

    return <div className = "posts-container">

            { !posts && <p>There are no posts on this thread yet...</p> }

            { posts && posts.map((post) => 
                <div className='single-post' key={post.postId}>
                    <div className="avatar-container">
                    {!post.author.isBanned && !checkIfBlockedFromFamily(post.author)&& post.author.isActive && <img className='avatar' src={userPic} alt="profile picture" />}
                    {(post.author.isBanned || checkIfBlockedFromFamily(post.author)) && post.author.isActive && <img className='avatar' src={bannedPic} alt="profile picture" />}
                    {!post.author.isActive && !post.author.isBanned && <img className='avatar' src={inactivePic} alt="profile picture" />}
                    </div>
                    
                    <div className="post-content">
                        
                        {post.author.isBanned && post.author.isActive && <p className='post-metadata'>Posted by <strong className='post-metadata-bold'>User &#91;in jail&#93; </strong> at {post.createdAt}</p>}
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
                        {!checkIfBlockedFromFamily(user) && post.author.userId != user.userId && !user.roles.includes("admin") && !post.isCensored && <Button className='post-btn' title='Report post' onClick={() => handleReport(post)}><i className="fas fa-exclamation"></i></Button>}
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
{/* Report modal */}
                  <Modal
        show={showReportModal}
        onHide={() => setShowReportModal(false)}
        centered
        className="modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Report</Modal.Title>
        </Modal.Header>
        <div className="thread-data">
          <p>Why are you snitching?</p>
          <input
            type="text"
            onChange={(e) => setReportReason(e.target.value)}
          />
          {isReported && <p>Success</p>}
        </div>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button onClick={onReport}>Confirm</Button>
        </Modal.Footer>
      </Modal>
        </div>;
};

export default Post;
