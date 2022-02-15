import React, { useState, useContext, useEffect } from "react";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocalStorage } from '../../CustomHooks/useLocalStorage'
import { getAuthenticationHeader, getAudience } from "../../CustomHooks/useAutenticationHeader";
import { useAuth0 } from "@auth0/auth0-react";

const CreateFamily = () => {
  const [familyName, setfamilyName] = useState("");
  const [description, setDescription] = useState("");
  const [user, setuser] = useLocalStorage('user', null)
  const {getAccessTokenSilently} = useAuth0();

  let navigate = useNavigate();

  const onSubmit = async () => {
    let family = {
      Name: familyName,
      Description: description,
      AdminId: user.userId,
    };

    const token = await getAccessToken();
    const header = getAuthenticationHeader(token);
    await axios
      .post(`https://localhost:44304/api/Family`, family, header)
      .then((res) => {
        console.log("Success: ", res.data);
        navigate(`/family/${res.data.familyId}`)
        window.location.reload(false);
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
    <div className="create-fam">
      <FloatingLabel controlId="inputName" label="Name" className="mb-3" className="dark">
        <Form.Control
        className="dark"
          as="textarea"
          placeholder="Family Name"
          value={familyName}
          onChange={(e) => setfamilyName(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel controlId="inputDescription" label="Description" className="dark">
        <Form.Control
        className="dark"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          as="textarea"
          placeholder="Write a description here..."
          style={{ height: "100px" }}
        />
      </FloatingLabel>
      <p>Admin: {user.userName}</p>
      <Button  onClick={onSubmit}>
        <p>Save</p>
      </Button>
    </div>
  );
};

export default CreateFamily;
