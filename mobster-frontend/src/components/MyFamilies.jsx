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
