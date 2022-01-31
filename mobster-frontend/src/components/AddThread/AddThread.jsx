import React,{useState, useEffect } from 'react'
import logo from '../../assets/Mobster-logo.png'
import './add-thread-styling.css'
import { useAuth0 } from '@auth0/auth0-react'; 
import axios from 'axios'



const AddThread = () => {
    const {user, isLoading} = useAuth0();
    const[isFetching, setIsFetching] = useState(true)
    const [myFamilies, setMyFamilies] = useState();
    const [thread, setThread] = useState({});
    console.log(user);

    const fetchFamiliesByAuthId = (async () => {
        let response = await axios.get(`https://localhost:44304/api/Family/user/sub/${user.sub}`)
        setMyFamilies(response.data) 
        setIsFetching(false);
        console.log(response)
    })

    useEffect(()=>{
        if(!isLoading){

            fetchFamiliesByAuthId();
        }
        
      },[isLoading])


    if(isLoading){
        return <div> <p>Loading thread...</p></div>
    }
    
    return (
        <div className="add-thread">
            
            <img src={logo} alt="profile picture" />
            <div className="thread-text">
                
                <div className="family-select">
                    <label htmlFor="family-selection">Choose a Family:</label>
                    {!isFetching && myFamilies && myFamilies.map((family) =>
                    <select name="family-selection">
                        <option >{family.name}</option>
                        
                    </select>)}
                    {!isFetching && !myFamilies &&
                    <p>You have not joined any families</p>
                    }
                </div>
               
                <input type="text" placeholder="Title" value={thread.title}/>
                <textarea placeholder="Text" name="thread-content"cols="70" rows="4" value={thread.content}></textarea>
                <button className="post-button">Post</button>
            
            </div>
        </div>
    )
}

export default AddThread
