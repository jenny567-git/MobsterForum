import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Table } from "react-bootstrap";

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
      
    setmembers(members.filter(function(user){
      return user.userId !== userId;
    }) );

  };
  const buttonStyles = {
    color: "white",
    fontFamily: "Lekton",
    margin: "10px",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "0.5rem"
  }

  return (
    <div className="container">
      <h1>Blocked members({members.length})</h1>
      {/* {Array.from(members).map((member) => (
        <div key={member.userId}>
          <ul>User name</ul>
          <ul>Date</ul>
          <li>{member.userName}</li>
          <p></p>
          <Button>Description</Button>
          <Button variant="danger" onClick={() => onRemove(member.userId)}>
            Remove block
          </Button>
        </div>
      ))} */}
      {!members.length ? 
      ( <>No users found...</> ) : 
      (
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
                  {/* <Button>Description (TODO)</Button> */}
                  <Button
                  style={buttonStyles}
                    variant="danger"
                    onClick={() => onRemove(member.userId)}
                  >
                    Remove block
                  </Button>
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
