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
    // const token = await getAccessTokenSilently({
    //   audience: config.audience,
    // });
    const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjdMWjVIUnBSZVczM2hlYnpvc2tKQSJ9.eyJpc3MiOiJodHRwczovL291dGxhdy1mb3J1bS5ldS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjIwMzcxNWEyYTI0ZWEwMDcwMDJhMmFhIiwiYXVkIjpbImh0dHBzOi8vbW9ic3Rlci9hcGkiLCJodHRwczovL291dGxhdy1mb3J1bS5ldS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjQ0NDg2NDUwLCJleHAiOjE2NDQ1NzI4NTAsImF6cCI6IktKdWdLMEdjblBtSXVzeUdCSUh2Y2Nqd1NWVWxuNkUzIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsInBlcm1pc3Npb25zIjpbXX0.cE9SGjTC6TFOFQl8AfJgUw_SP1jgGuZj8v4XjE1htbMzLwbZ6gu3HtHPrwGM2QvVRh_78jDbjkqm9u1QsNdOaj5VflUPvJRANkS0QLkjGYyunJm86F8vN1BQqfrnHrMAc-OKjQnBu-auMyzN1cLuBhQfiXglVNW4jKPG8M1L5fxU5O0P3TXM7Rzfq89KiRP0AQaK0dNmpduyB7EZcyCD35ToGWB1B1wGIyGYwQOR0EygM1dfq4Ei1EbMSwkAXhgHUHtzvZdg_H6f1VWEn_ERxT18cU1X-7WfYpZqyP2BJ4efCYyVEDndwljeI9uuaaNydNBAlu6D1qrqbfkNGuI7lw'
    axios
      .get(`https://cors-anywhere.herokuapp.com/https://localhost:44304/api/Family/top5`, {
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
