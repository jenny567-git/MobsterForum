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
        //redirect to user list? or an component with search user function +add button
    };

    const toggleEdit = () =>{
        isEditing ? setIsEditing(false) : setIsEditing(true);
    }

    //working
    const toMembers = () => {
        //test to manipulate context
        let family = {
        ...context.family
        };
        family.memberCount = -10
        updateContext({
            family: family,
            test: "new"
        })
        //redirect to members list -> new component
    }
    
    const toJoin = () => {
        //fetch api
    }
    
    const onDelete = () => {
        //fetch api
    }
    
    const onCreate = () => {
        navigate('/family/create');
    }

    return (
        <div>
            <h1>{context.family.name}</h1>
            <h1>{context.test}</h1>
            <p>Members: {context.family.memberCount}</p>
            <button onClick={toInviteLink}>Invite (Link)</button>
            <button onClick={toJoin} disabled>Join</button>
            <button onClick={toggleEdit}>Edit</button>
            <button onClick={toMembers}>Members (mainpulate context)</button>
            <button onClick={onDelete}>Delete family</button>
            <button onClick={onCreate}>Create new family</button>
            {isEditing && (<EditFamily/>)}
            <FakeThread/>
            <FakeThread/>
            <FakeThread/>
        </div>
    )
}

export default Family
