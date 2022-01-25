import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../utils/store";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateFamily = () => {
  const [familyName, setfamilyName] = useState("");
  const [description, setDescription] = useState("");
  const [context, updateContext] = useContext(Context);

  let navigate = useNavigate();

  const onSubmit = async () => {
    let family = {
      Name: familyName,
      Description: description,
      AdminId: context.user.userid,
    };

    await axios
      .post(`https://localhost:44304/api/Family`, family)
      .then((res) => {
        console.log("Success: ", res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <Button onClick={() => navigate(-1)}>Back</Button>
      <h2>Create new family</h2>
      {/* <p>Name:</p> */}
      {/* <input
        type="text"
        value={familyName}
        onChange={(e) => setfamilyName(e.target.value)}
      /> */}
      {/* <p>Description:</p>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      /> */}
      <FloatingLabel controlId="inputName" label="Name" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Family Name"
          value={familyName}
          onChange={(e) => setfamilyName(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel controlId="inputDescription" label="Description">
        <Form.Control
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          as="textarea"
          placeholder="Write a description here..."
          style={{ height: "100px" }}
        />
      </FloatingLabel>
      <p>Admin: {context.user.userid}</p>
      <Button variant="success" onClick={onSubmit}>
        Save
      </Button>
    </div>
  );
};

export default CreateFamily;
