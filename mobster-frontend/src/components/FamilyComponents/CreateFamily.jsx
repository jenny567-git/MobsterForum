import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../utils/store";

const CreateFamily = () => {
    const [familyName, setfamilyName] = useState("");
    const [description, setDescription] = useState("");
    const [context, updateContext] = useContext(Context)

    const onSubmit = () => {
        fetch(
            //works, but get error "Error: SyntaxError: Unexpected end of JSON input"
          "https://localhost:44304/api/Family",
          {
            method: "Post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              Name: familyName,
              Description: description,
              AdminId: context.user.userid
            }),
          })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
      };

    return (
        <div>
        <p>Name:</p>
        <input
          type="text"
          value={familyName}
          onChange={(e) => setfamilyName(e.target.value)}
        />
        <p>Description:</p>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <p>Admin: {context.user.userid}</p>
        <button onClick={onSubmit}>Save</button>
      </div>
    )
}

export default CreateFamily
