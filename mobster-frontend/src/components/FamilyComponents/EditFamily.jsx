import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../utils/store";

const EditFamily = () => {
  const [context, updateContext] = useContext(Context);
  const [loading, setloading] = useState(true);
  const [familyName, setfamilyName] = useState("");
  const [description, setDescription] = useState("");
  const [admin, setAdmin] = useState("");

  useEffect(() => {
    console.log("in effect");
    fetchFamily();
  }, []);

  const fetchFamily = async () => {
    console.log("in fetch get");
    var response = await fetch(
      "https://localhost:44304/api/Family/F17478B7-D991-48DD-1AD4-08D9DB54486B"
    );
    var result = await response.json();
    console.log(result);
    setfamilyName(result.name);
    setDescription(result.description);
    setAdmin(result.adminUserId);
    setloading(false);
  };

  const onSubmit = () => {
      console.log('familyname:' + familyName);
    fetch(
      "https://localhost:44304/api/Family?familyId=F17478B7-D991-48DD-1AD4-08D9DB54486B",
      {
        method: "Put",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          Name: familyName,
          Description: description,
          AdminId: admin,
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
    <>
      {/* {!loading && ( */}
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
          <p>Current admin:</p>
          <input
            type="text"
            value={admin}
            onChange={(e) => setAdmin(e.target.value)}
          />
          <p>
            - Hämta alla family members och ha current admin som current
            selected
          </p>
          <button onClick={onSubmit}>Save</button>
        </div>
      {/* )} */}
    </>
  );
};

export default EditFamily;
