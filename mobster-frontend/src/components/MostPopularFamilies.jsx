import { React, useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { getAuthenticationHeader, getAudience } from "../CustomHooks/useAutenticationHeader";

function MyFamilies() {
  const [families, setFamilies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    user,
    isAuthenticated,
    getAccessTokenSilently,
} = useAuth0();

  useEffect(() => {
    fetchTop5();
  }, []);

  let navigate = useNavigate();

  const fetchTop5 = async () => {
     const token = await getAccessToken();
     const header = getAuthenticationHeader(token);
     console.log(header);

    axios
      .get(`https://localhost:44304/api/Family/top5`,
        header
      )
      .then((res) => {
        console.log("Success: ", res.data);
        setFamilies(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getAccessToken = async () => {
    const audience = getAudience();
    const token = await getAccessTokenSilently({
      audience: audience,
    });
    return token;
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
