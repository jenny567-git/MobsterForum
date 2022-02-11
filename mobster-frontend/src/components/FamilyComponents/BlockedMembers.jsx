import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import "../../../src/index.css";

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
    console.log("in delete");
    const addUser = await axios.post(
      `https://localhost:44304/addMember?familyId=${familyId}&userId=${userId}`
    ).then((res) => {
      console.log("Success: ", res.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
    
    const response = await axios
      .delete(
        `https://localhost:44304/api/Block?userId=${userId}&familyId=${familyId}`
      )
      .then((res) => {
        console.log("Success: ", res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setmembers(
      members.filter(function (user) {
        return user.userId !== userId;
      })
    );
  };

  return (
    <div className="flex-space">
      <h1>Blocked members({members.length})</h1>
      {!members.length ? (
        <>No users found...</>
      ) : (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>User name</th>
              <th>Blocked since</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Array.from(members).map((member) => (
              <tr key={member.userId}>
                <td>{member.userName}</td>
                <td> {member.createdAt}</td>
                <td>
                  <div className="remove-btn">
                    <Button onClick={() => onRemove(member.userId)}>
                      Remove block
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default BlockedMembers;
