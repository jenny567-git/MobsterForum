import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../CustomHooks/useLocalStorage";
import axios from "axios";
import userPic from "../../assets/profile-icons/user.jpg";
import "./add-thread-styling.css";
import { getAuthenticationHeader, getAudience } from '../../CustomHooks/useAutenticationHeader';
import { useAuth0 } from '@auth0/auth0-react';

const AddThread = () => {
  const {getAccessTokenSilently} = useAuth0();
  const [user, setuser] = useLocalStorage("user", null);
  const [isFetching, setIsFetching] = useState(true);
  const [myFamilies, setMyFamilies] = useState();
  const [thread, setThread] = useState({
    familyId: "",
    title: "",
    content: "",
    authorId: "",
  });
  let navigate = useNavigate();

  const fetchFamiliesByUserId = async () => {
    let response = await axios.get(
      `https://localhost:44304/api/Family/user/${user.userId}`
    );
    setMyFamilies(response.data);
    setIsFetching(false);
    console.log(response);
  };

  const postThread = async () => {
    const token = await getAccessToken();
    const header = getAuthenticationHeader(token);
    let response = await axios.post("https://localhost:44304/api/Thread",thread, header);
    navigate(`/family/${thread.familyId}`);
  };

  const getAccessToken = async () => {
    const audience = getAudience();
    const token = await getAccessTokenSilently({
      audience: audience,
    });
    return token;
  }

  useEffect(() => {
    fetchFamiliesByUserId();
    setThread({
      ...thread,
      authorId: user.userId,
    });
  }, []);

  return (
    <div className="add-thread">
      <div className="thread-text">
        <div className="family-select">
          <label htmlFor="family-selection">Create new thread in Family:</label>
          <select
            value={thread.familyId}
            onChange={(e) =>
              setThread({
                ...thread,
                familyId: e.target.value,
              })
            }
            name="family-selection"
          >
            <option value="" disabled>
              Choose a Family
            </option>
            {!isFetching &&
              myFamilies &&
              myFamilies.map((family) => (
                <option key={family.familyId} value={family.familyId}>
                  {family.name}
                </option>
              ))}
          </select>
          {!isFetching && !myFamilies && (
            <p>You have not joined any families</p>
          )}
        </div>

        <input
          type="text"
          placeholder="Title"
          onChange={(e) =>
            setThread({
              ...thread,
              title: e.target.value,
            })
          }
          value={thread.title}
        />
        <textarea
          placeholder="Text"
          name="thread-content"
          cols="70"
          rows="4"
          onChange={(e) =>
            setThread({
              ...thread,
              content: e.target.value,
            })
          }
          value={thread.content}
        ></textarea>
        <button onClick={postThread} className="post-button">
          <p>Post</p>
        </button>
      </div>
    </div>
  );
};

export default AddThread;
