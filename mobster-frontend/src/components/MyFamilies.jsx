/*import React, {useEffect, useState} from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function MyFamilies() {

    const {user} = useAuth0();
    console.log(user);
    const [myFamilies, setFamilies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    let navigate = useNavigate();
    
    useEffect( ()=> {
        const families = axios.get(`https://localhost:44304/api/Family/user/${user.sub}`); 
        console.log(families)
        setFamilies(families.data); 
        if (!families.length){
            setError(true);
        }
        setIsLoading(false)
    }, []);
    

    return (
        <div className="my-families">
            <h3>My Families</h3>
            { error && <h2>you haven't joined any families.</h2> }
            { isLoading && <div>Loading families...</div> }
            <ul>
            {!isLoading && Array.from(myFamilies).map((family) => (
                <li key={family.familyId} 
                onClick={() => navigate(`/family/${family.familyId}`)}>{family.name}</li>
              ))}
            </ul>
        </div>
    )
}

export default MyFamilies*/
import {React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyFamilies() {
  const [families, setFamilies] = useState([]);
  const [isLoading, setisLoading] = useState(true)
  let navigate = useNavigate();
  

  const baseURL = 'https://localhost:44304/api/Family'

  useEffect(() => {
    axios.get(baseURL).then((res) => {
        setFamilies(res.data)
        setisLoading(false)
        console.log(res.data);
    });
  }, []);

  return (
    <div className="my-families">
      <h3>My Families</h3>
      <ul>
      {!isLoading && Array.from(families).map((result) => (
                <li key={result.familyId} 
                result={result} 
                onClick={() =>
                    navigate(`/family/${result.familyId}`)
                  }>{result.name}</li>
              ))}
      </ul>
    </div>
  );
}

export default MyFamilies;
