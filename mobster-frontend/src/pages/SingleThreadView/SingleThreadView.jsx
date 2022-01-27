import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import "./SingleThreadView-styling.css"
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'; 

const SingleThreadView = () => {
  const { id } = useParams();
  const [isReadOnly, setIsReadOnly]= useState(true)
  const [thread, setThread] = useState();
  const [threadTitle, setThreadTitle]= useState("")
  const [threadContent, setThreadContent]= useState("")
  const [loggedInUser, setLoggedInUser] = useState(useAuth0());
  const [btnText, setBtnText]= useState("Edit")

  const fetchThreadById = (async ()=> {let response = await axios.get(`https://localhost:44304/api/Thread/${id}`) 
  console.log(response)
  response.data.createdAt = response.data.createdAt.slice(0,10)
  setThread(response.data)
  setThreadContent(response.data.content)
  setThreadTitle(response.data.title)
  })

  const editThread = (async ()=>{
   if(isReadOnly && thread.author.userId != loggedInUser){
    console.log(loggedInUser)

     setIsReadOnly(false)
    setBtnText("Save")
   }
   else if(!isReadOnly && thread.author.userId != loggedInUser){
      let updatedThread = {
        familyId: thread.family.familyId,
        title: threadTitle,
        content: threadContent,
        authorId: thread.author.userId
      }
      console.log(updatedThread)
      setIsReadOnly(true)
      setBtnText("Edit")
      const response = await axios.put(`https://localhost:44304/api/Thread?id=${id}`,updatedThread)
      console.log(response)
   }
    
  })

  useEffect(()=>{
    fetchThreadById();
    console.log(loggedInUser)
  },[])
  
  return <div className="SingleThreadView">
    <div className="thread-container">
        
        { thread && (<div className="thread">
          <p className="thread-metadata"> 
            Posted by <strong className='thread-metadata-bold'>{thread.author.userName}</strong> in <em className='thread-metadata-bold'>{thread.family.name}</em>  at {thread.createdAt}
          </p>
          { isReadOnly && (<div>
            <input value={thread.title} readOnly></input>
            <textarea value={thread.content} readOnly></textarea>
          </div>)}
          
          {!isReadOnly && (<div>
            <input value={threadTitle} onChange={e => setThreadTitle(e.target.value)}></input>
            <textarea value={threadContent} onChange={e => setThreadContent(e.target.value)}></textarea>
          </div>)}
          
          <div className="thread-btns">
            {thread.author.userId != loggedInUser && (
              <div className='crud-btns'>
                <button onClick={editThread}>{btnText}</button>
                <button>Delete</button>
              </div>
            )}
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
