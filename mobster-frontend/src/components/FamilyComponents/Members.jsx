import React from 'react'
import Member from './Member'
import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { Button } from 'react-bootstrap';

const Members = () => {
    const { familyId } = useParams();
    const [members, setmembers] = useState([])
    
  let navigate = useNavigate();

    useEffect(() => {
        fetchFamily();
    }, [members])
    
    const fetchFamily = async () => {
        const response = await axios.get(
          `https://localhost:44304/api/Family/${familyId}/members`
        );
        setmembers(response.data)
      };

    return (
        <div>
            <Button variant="dark" onClick={() => navigate(`/family/${familyId}/blockedMembers`)}>Blocked member list</Button>
            <h1>List of members</h1>
            {Array.from(members).map((member) => (
                <Member key={member.userId} member={member}/>
            ))}
        </div>
    )
}

export default Members
