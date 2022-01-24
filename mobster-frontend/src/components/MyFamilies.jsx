import {React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FakeThread from "./Fakes/FakeThread";

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
        
        
        {/* <li
          onClick={() =>
            navigate("/family/F17478B7-D991-48DD-1AD4-08D9DB54486B")
          }
        >
          Hardcoded fam
        </li> */}
        {/* <li>family 2</li>
        <li>family 3</li>
        <li>family 4</li>
        <li>family 5</li>
        <li>family 6</li> */}
      </ul>
    </div>
  );
}

export default MyFamilies;
