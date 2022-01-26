import React from "react";
import { Button } from "react-bootstrap";
// import { useParams } from "react-router-dom";
import axios from "axios";

const Member = ({ member, familyId }) => {
  // const { familyId } = useParams();

  const onBlock = async () => {
    let blockedUser = {
      FamilyId: familyId,
      UserId: member.userId,
      Description: "",
    };

    const response = await axios
      .post(`https://localhost:44304/api/Block/`, blockedUser)
      .then((res) => {
        console.log("Success: ", res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onRemove = async () => {
    const response = await axios
    .delete(`https://localhost:44304/removeUser?familyId=${familyId}&userId=${member.userId}`)
    .then((res) => {
      console.log("Success: ", res.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  return (
    <>
      <p>Member: {member.userName}</p>
      <Button onClick={onBlock}>Block</Button>
      <Button variant="danger" onClick={onRemove}>
        Remove
      </Button>
    </>
  );
};

export default Member;
