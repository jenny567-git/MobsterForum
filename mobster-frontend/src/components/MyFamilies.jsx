import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocalStorage } from '../CustomHooks/useLocalStorage'


function MyFamilies() {
  const [myFamilies, setFamilies] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(false);
  const [user, setuser] = useLocalStorage('user', null)
  let navigate = useNavigate();

  useEffect(() => {
      fetchFamilies();
  }, []);

  const fetchFamilies = async () => {
    console.log('fetching');
    const families = await axios.get(
      `https://localhost:44304/api/Family/user/${user.userId}`
    );
    setFamilies(families.data);
    if (!families.data.length) {
      setError(true);
    }
    setIsFetching(false);
  };

  if (error)
    return (
      <div className="my-families">
      <h3>My Families</h3>
        <p>You haven't joined any families.</p>
      </div>
    );

  // { error && <h2>you haven't joined any families.</h2> }
  return (
    <div className="my-families">
      <h3>My Families</h3>
      {isFetching && <div>Loading families...</div>}
      <ul>
        {
          Array.from(myFamilies).map((family) => (
            <li
              key={family.familyId}
              onClick={() => navigate(`/family/${family.familyId}`)}
            >
              {family.name}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default MyFamilies;

