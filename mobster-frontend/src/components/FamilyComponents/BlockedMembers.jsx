import React from "react";
import Member from "./Member";
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User name</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Array.from(members).map((member) => (
            <tr key={member.userId}>
              <td>{member.userName}</td>
              <td> TODO</td>
              <td>
                <Button>Description (TODO)</Button>
                <Button
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
    </div>
  );
};

export default BlockedMembers;
