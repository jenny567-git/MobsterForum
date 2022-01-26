import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Context } from "../../utils/store";

const EditFamily = () => {
  const [context, updateContext] = useContext(Context);
  const [loading, setloading] = useState(true);
  const [success, setSuccess] = useState(false);
  //useState with object, how to partial update object
  //https://stackoverflow.com/questions/54150783/react-hooks-usestate-with-object
  const [familyName, setfamilyName] = useState("");
  const [description, setDescription] = useState("");
  const [admin, setAdmin] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetchFamily();
  }, []);

  const fetchFamily = async () => {
    const response = await axios.get(
      `https://localhost:44304/api/Family/${id}`
    );
    setfamilyName(response.data.name);
    setDescription(response.data.description);
    setAdmin(response.data.adminUserId);
    setloading(false);
  };

  const onSubmit = async () => {
    let updatedFamily = {
      Name: familyName,
      Description: description,
      AdminId: admin,
    };
    await axios
      .put(`https://localhost:44304/api/Family?familyId=${id}`, updatedFamily)
      .then((res) => {
        console.log("Success: ", res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    //how to update parent component without refreshing page? context?
    setSuccess(true);
    const timer = setTimeout(() => {
      window.location.reload(false);
    }, 1500);
  };

  return (
    <>
      {/* {!loading && ( */}
      <div>
        {success && (
          <p style={{ color: "green" }}>
            Successfully added! Updated in 2 seconds...
          </p>
        )}
        <p>Name:</p>
        <input
          type="text"
          value={familyName}
          onChange={(e) => setfamilyName(e.target.value)}
        />
        <p>Description:</p>
        {/* TODO: bigger text area */}
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
          - Hämta alla family members och ha current admin som current selected
        </p>
        <Button onClick={onSubmit}>Save</Button>
      </div>
      {/* )} */}
    </>
  );
};

export default EditFamily;
