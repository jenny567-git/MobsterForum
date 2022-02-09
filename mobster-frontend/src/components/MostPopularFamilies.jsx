import { React, useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";

function MyFamilies() {
  const [families, setFamilies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchTop5();
  }, []);

  let navigate = useNavigate();

  const fetchTop5 = async () => {
    axios
      .get(`https://localhost:44304/api/Family/top5`)
      .then((res) => {
        console.log("Success: ", res.data);
        setFamilies(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
