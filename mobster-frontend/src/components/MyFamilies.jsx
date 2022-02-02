import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyFamilies() {
  const { user, isLoading } = useAuth0();
  const [myFamilies, setFamilies] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      fetchFamilies();
    }
  }, [isLoading]);

  const fetchFamilies = async () => {
    const families = await axios.get(
      `https://localhost:44304/api/Family/user/${user["https://rules.com/claims/user_metadata"].uuid}`
    );
    console.log("families", families.data);
    setFamilies(families.data);
    if (!families.data.length) {
      setError(true);
    }
    setIsFetching(false);
  };

  if (error)
    return (
      <div className="my-families">
        <h2>you haven't joined any families.</h2>
      </div>
    );

  // { error && <h2>you haven't joined any families.</h2> }
  return (
    <div className="my-families">
      <h3>My Families</h3>
      {isFetching && <div>Loading families...</div>}
      <ul>
        {!isLoading &&
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

// import {React, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function MyFamilies() {
//   const [families, setFamilies] = useState([]);
//   const [isLoading, setisLoading] = useState(true)
//   let navigate = useNavigate();

//   const baseURL = 'https://localhost:44304/api/Family'

//   useEffect(() => {
//     axios.get(baseURL).then((res) => {
//         setFamilies(res.data)
//         setisLoading(false)
//         console.log(res.data);
//     });
//   }, []);

//   return (
//     <div className="my-families">
//       <h3>My Families</h3>
//       <ul>
//       {!isLoading && Array.from(families).map((result) => (
//                 <li key={result.familyId}
//                 result={result}
//                 onClick={() =>
//                     navigate(`/family/${result.familyId}`)
//                   }>{result.name}</li>
//               ))}
//       </ul>
//     </div>
//   );
// }

// export default MyFamilies;
