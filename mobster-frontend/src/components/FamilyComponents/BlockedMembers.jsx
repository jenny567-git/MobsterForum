import React from "react";
import Member from "./Member";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";

const BlockedMembers = () => {
  const [members, setmembers] = useState([]);
  const { familyId } = useParams();

  useEffect(() => {
    fetchBlockedMembers();
  }, []);

  const fetchBlockedMembers = async () => {
    const response = await axios.get(
      `https://localhost:44304/api/Block?familyId=${familyId}`
    );
    setmembers(response.data);
    console.log(response.data);
  };

  const onRemove = async (userId) => {
      console.log('in delete');
    // const response = await axios
    //   .delete(
    //     `https://localhost:44304/api/Block?userId=${userId}&familyId=${familyId}`
    //   )
    //   .then((res) => {
    //     console.log("Success: ", res.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  };

  return (
    <div>
      <h1>Blocked members({members.length})</h1>
      {Array.from(members).map((member) => (
        <div key={member.userId}>
          <li>{member.userName}</li>
          <Button variant="danger" onClick={() => onRemove(member.userId)}>
            Remove block
          </Button>
        </div>
      ))}
    </div>
  );
};

export default BlockedMembers;
