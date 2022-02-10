import { React, useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { getConfig } from "../config";


function MyFamilies() {
  const [families, setFamilies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    user,
    isAuthenticated,
    getAccessTokenSilently,
    getIdTokenClaims
} = useAuth0();

const config = getConfig();

  useEffect(() => {
    fetchTop5();
  }, []);

  let navigate = useNavigate();

  const fetchTop5 = async () => {
     const token = await getAccessTokenSilently({
       audience: config.audience,
     });
    console.log(token)
    axios
      .get(`https://localhost:44304/api/Family/top5`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log("Success: ", res.data);
        setFamilies(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      // console.log('token', token);
  };

  const getToken = async () => {
    const token = await getAccessTokenSilently({
      audience: config.audience,
    });
    console.log(token);
  }

  const getIdToken = async () => {
    const token = await getIdTokenClaims({
      audience: config.audience,
    });
    console.log(token);
  }

  return (
    <div className="mp-families">
      <h3>Most Popular Families</h3>
      <ul>
      {!isLoading &&
          Array.from(families).map((family) => (
            <li
              key={family.familyId}
              onClick={() => navigate(`/family/${family.familyId}`)}
            >
                <p>{family.name}<br></br> <span>Members: {family.memberCount}</span></p>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default MyFamilies;
