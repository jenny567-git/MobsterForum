import React, {useState, useContext} from 'react'
import FakeThread from '../components/Fakes/FakeThread'
import { Context } from '../utils/store'
import { useNavigate } from "react-router-dom";
import EditFamily from '../components/FamilyComponents/EditFamily';

const Family = () => {
    const [context, updateContext] = useContext(Context)
    const [isEditing, setIsEditing] = useState(false)

    let navigate = useNavigate();

    const toInviteLink = () => {
        navigate('/');
    };

    const toggleEdit = () =>{
        isEditing ? setIsEditing(false) : setIsEditing(true);
    }

    const toMembers = () => {
        //test to manipulate context
        updateContext(prevState => ({
            family:{
                ...prevState.family,
                memberCount: 1
            }
        }))
        console.log(context.family.memberCount);
    }

    return (
        <div>
            <h1>{context.family.name}</h1>
            <p>Members: {context.family.memberCount}</p>
            <button onClick={toInviteLink}>Invite</button>
            <button onClick={toggleEdit}>Edit</button>
            <button onClick={toMembers}>Members</button>
            {isEditing && (<EditFamily/>)}
            <FakeThread/>
            <FakeThread/>
            <FakeThread/>
        </div>
    )
}

export default Family
