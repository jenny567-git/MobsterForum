import { useState, useEffect } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./invite.css";
import axios from "axios";

const InviteMembers = ({familyId, stateChanger}) => {
  const [selected, setSelected] = useState([]);
  const [users, setUsers] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios
      .get(`https://localhost:44304/api/Family/${familyId}/invite`)
      .then((res) => {
        console.log("Success: ", res.data);
        setUsers(res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onSelect = (data) => {
    setSelected(data);
    console.log(data);
  };

  const onAdd = async () => {
    console.log("in add", selected);
    const response = await axios
      .post(`https://localhost:44304/addMembers?familyId=${familyId}`, selected)
      .then((res) => {
        console.log("Success: ", res.data);
        setUsers(users.filter((user) => !selected.includes(user)));
        setSelected([]);
        setSuccess(true);
        stateChanger('New data');
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(true);
      });
      
      //show response for 5s
      setTimeout(() => {
        setSuccess(false);
        setError(false);
      }, 5000);
  };

  return (
    <div className="add-member">
      <Form.Group>
        <Typeahead
          id="basic-typeahead-multi"
          multiple
          labelKey="userName"
          onChange={(e) => onSelect(e)}
          options={users}
          placeholder="Type a username"
          selected={selected}
        />
      </Form.Group>
      <Button onClick={onAdd}><p>Add</p></Button>
      {success && <Alert variant="success">Success</Alert>}
      {error && <Alert variant="danger">Error</Alert>}
    </div>
  );
};

export default InviteMembers;
