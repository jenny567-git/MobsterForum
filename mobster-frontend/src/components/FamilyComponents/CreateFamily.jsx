import React, { useState, useContext, useEffect } from "react";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocalStorage } from '../../CustomHooks/useLocalStorage'

const CreateFamily = () => {
  const [familyName, setfamilyName] = useState("");
  const [description, setDescription] = useState("");
  const [user, setuser] = useLocalStorage('user', null)

  let navigate = useNavigate();

  const onSubmit = async () => {
    let family = {
      Name: familyName,
      Description: description,
      AdminId: user.userId,
    };

    await axios
      .post(`https://localhost:44304/api/Family`, family)
      .then((res) => {
        console.log("Success: ", res.data);
        navigate(`/family/${res.data.familyId}`)
        window.location.reload(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const buttonStyles = {
    color: "white",
    backgroundColor: "#ec625f",
    border: "none",
    fontFamily: "Lekton",
    margin: "10px",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "0.5rem",
    width: "25%",
  }

  return (
    <div>
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
      <Button style={buttonStyles} variant="success" onClick={onSubmit}>
        Save
      </Button>
    </div>
  );
};

export default CreateFamily;
