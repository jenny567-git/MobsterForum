import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import { useLocalStorage } from "../../CustomHooks/useLocalStorage";
import { getAuthenticationHeader, getAudience } from "../../CustomHooks/useAutenticationHeader";
import { useAuth0 } from "@auth0/auth0-react";

const Members = () => {
  const [user,setUser] = useLocalStorage('user', null)
  const [members, setmembers] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const {getAccessTokenSilently} = useAuth0();
  let navigate = useNavigate();

  const { familyId } = useParams();

  useEffect(() => {
    fetchFamily();
  }, []);

  const fetchFamily = async () => {
    const response = await axios.get(
      `https://localhost:44304/api/Family/${familyId}/members`
    );
    setmembers(response.data);
    setisLoading(false);
  };

  const onBlock = async (member) => {
    let blockedUser = {
      FamilyId: familyId,
      UserId: member.userId,
      Description: "",
    };

    const token = await getAccessToken();
    const header = getAuthenticationHeader(token);
    const response = await axios
      .post(`https://localhost:44304/api/Block/`, blockedUser, header)
      .then((res) => {
        console.log("Success: ", res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setmembers(
      members.filter(function (user) {
        return user.userId !== member.userId;
      })
    );
  };

  const onRemove = async (member) => {
    const token = await getAccessToken();
    const header = getAuthenticationHeader(token);
    const response = await axios
      .delete(
        `https://localhost:44304/removeUser?familyId=${familyId}&userId=${member.userId}`, header
      )
      .then((res) => {
        console.log("Success: ", res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setmembers(
      members.filter(function (user) {
        return user.userId !== member.userId;
      })
    );
  };

  const getAccessToken = async () => {
    const audience = getAudience();
    const token = await getAccessTokenSilently({
      audience: audience,
    });
    return token;
  }

  if (isLoading) return <>Loading...</>;

  return (
    <div className="flex-space">
      
        <h1>List of members ({members.length})</h1>
        <Button onClick={() => navigate(`/family/${familyId}/blockedMembers`)}>
          Blocked member list
        </Button>
     
        <Table striped bordered hover size="sm" variant="dark">
          <thead>
            <tr>
              <th>User Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Array.from(members).map((member) => (
              <tr key={member.userId}>
                <td>{member.userName}</td>
                <td>
                  {user.userId != member.userId &&(<div className="fs">
                    <div className="block-btn"><Button onClick={() => onBlock(member)}>Block</Button></div>
                    <div className="remove-btn"><Button onClick={() => onRemove(member)}>Remove</Button></div>
                  </div>)}
                  {user.userId == member.userId && <div className = "fs">
                    <h4>Admin</h4>
                  </div>}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      
    </div>
  );
};

export default Members;
