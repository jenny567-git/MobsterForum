import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
// import { useAuth0 } from '@auth0/auth0-react'; 
import { useLocalStorage } from '../../CustomHooks/useLocalStorage';
import { Button } from 'react-bootstrap';
import { Post } from '../../components/Post/Post';
import "./SingleThreadView-styling.css"

const SingleThreadView = () => {
  const { id } = useParams();
  const [isReadOnly, setIsReadOnly] = useState(true)
  const [thread, setThread] = useState();
  const [isThreadLoaded, setIsThreadLoaded] = useState(false)
  const [threadTitle, setThreadTitle] = useState("")
  const [threadContent, setThreadContent] = useState("")
  const [blockedMembers, setBlockedMembers] = useState([])
  const [btnText, setBtnText] = useState(<i className='fas fa-edit' title="Edit thread"></i>)
  // const {user, isLoading} = useAuth0();
  const [user, setuser] = useLocalStorage('user', null)
  let navigate = useNavigate();

  // TODO: add error so that "no content found" can be rendered on error
  const fetchThreadById = (async () => {
    let response = await axios.get(`https://localhost:44304/api/Thread/${id}`)
    response.data.createdAt = response.data.createdAt.slice(0, 10)
    setThread(response.data)
    setThreadContent(response.data.content)
    setThreadTitle(response.data.title)
    if(response.data){
      setIsThreadLoaded(true)
    }
  })

  const fetchBlockedMembersByFamilyId = (async () => {
    let response = await axios.get(`https://localhost:44304/api/Block?familyId=${thread.family.familyId}`)
    response.data ? setBlockedMembers(response.data) : setBlockedMembers([])
    console.log(response.data); 
  })

  const checkIfBlockedFromFamily = ((author) => {
    let blockedMembersIds = blockedMembers.map(m => m.userId)
    return blockedMembersIds.includes(author.userId)
  })

  const deleteThread = (async () => {
    let response = await axios.delete(`https://localhost:44304/api/Thread?id=${id}`)
    console.log(response);
    alert("your thread has been deleted")
    navigate("/")


  })

  function log(){
    console.log(thread)
  }

  const editThread = (async () => {
    if (isReadOnly && thread.author.authId == user.userId) {

      setIsReadOnly(false)
      setBtnText(<i className="fas fa-save"></i>)
    }
    else if (!isReadOnly && thread.author.authId == user.userId) {
      let updatedThread = {
        familyId: thread.family.familyId,
        title: threadTitle,
        content: threadContent,
        authorId: thread.author.userId
      }
      console.log(updatedThread)
      setIsReadOnly(true)
      setBtnText(<i className='fas fa-edit' title="Save changes"></i>)
      const response = await axios.put(`https://localhost:44304/api/Thread?id=${id}`, updatedThread)
      console.log(response)
    }

  })

  const toggleReplyBox = () => {
    // setVisible(!isVisible);
    scrollToBottom();
  }
  function logThread(){
    console.log(thread)
  }

  function getThreadLink() {
    navigator.clipboard.writeText(window.location.href);
  }

  function scrollToBottom() {
    let scrollingElement = (document.scrollingElement || document.body);
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
  }

  function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  useEffect(() => {
    fetchThreadById();
    if(isThreadLoaded){

      fetchBlockedMembersByFamilyId();
    }
  }, [isThreadLoaded])
  // if(isLoading){
  //   return <div> <p>Loading thread...</p></div>
  // }
  return <div className="SingleThreadView">

    <div className="main-container">
      <div className="thread-container">

        {thread && (<div className="thread">
          {thread.author.isBanned && <p className="thread-metadata">Posted by <strong className='thread-metadata-banned'> &#91;Banned User&#93; </strong> in <em className='thread-metadata-bold'>{thread.family.name}</em>  at {thread.createdAt}</p>}
          {!thread.author.isActive && <p className="thread-metadata">Posted by <strong className='thread-metadata-bold'>&#91;Deleted User&#93;</strong> in <em className='thread-metadata-bold'>{thread.family.name}</em>  at {thread.createdAt}</p>}
          {!thread.author.isBanned && thread.author.isActive && <p className="thread-metadata">Posted by <strong className='thread-metadata-bold'>{thread.author.userName}</strong> in <em className='thread-metadata-bold'>{thread.family.name}</em>  at {thread.createdAt}</p>}

          {isReadOnly && (<div className='thread-data'>
            <input value={threadTitle} readOnly></input>
            <textarea value={threadContent} readOnly></textarea>
          </div>)}

          {!isReadOnly && (<div className='thread-data'>
            <input value={threadTitle} onChange={e => setThreadTitle(e.target.value)}></input>
            <textarea value={threadContent} onChange={e => setThreadContent(e.target.value)} rows="8"></textarea>
          </div>)}

          <div className="thread-btns">
            {!checkIfBlockedFromFamily(user) && thread.author.userId == user.userId && (
              <div className='thread-btns'>
                <Button className='thread-btns' onClick={editThread}>{btnText}</Button>
                <Button className='thread-btns' onClick={deleteThread} title="Delete thread"><i className="fas fa-trash-alt"></i></Button>
              </div>
            )}
            <Button className='thread-btns' title='Post reply' onClick={toggleReplyBox}><i className="fas fa-reply"></i></Button>
            {!checkIfBlockedFromFamily(user) && <Button className='thread-btns' title='Share link' onClick={getThreadLink}><i className="fas fa-share-square"></i></Button>}
            {/* <Button className='thread-btns' title='Report thread' ><i className="fas fa-exclamation"></i></Button> */}
            {!checkIfBlockedFromFamily(user) && user.roles.includes("admin") && (<Button className='thread-btns' title='Censor thread content'><i className="fas fa-comment-slash"></i></Button>)}

          </div>
        </div>
        )}
        <div className="thread-posts">
          <Post id={id} blockedMembers = {blockedMembers} thread ={thread} />
        </div>

        <Button className='backtotop-button' onClick={scrollToTop}><p>Back to top</p></Button>
        <Button className='backtotop-button' onClick={log}><p> top</p></Button>
      </div>
    </div>

  </div>;
}

export default SingleThreadView;
