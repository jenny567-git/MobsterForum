import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../utils/store";
import { FloatingLabel, Form } from "react-bootstrap";

const CreateFamily = () => {
  const [familyName, setfamilyName] = useState("");
  const [description, setDescription] = useState("");
  const [context, updateContext] = useContext(Context);

  const onSubmit = () => {
    fetch(
      //works, but get error "Error: SyntaxError: Unexpected end of JSON input"
      "https://localhost:44304/api/Family",
      {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: familyName,
          Description: description,
          AdminId: context.user.userid,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
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
      <button onClick={onSubmit}>Save</button>
    </div>
  );
};

export default CreateFamily;
