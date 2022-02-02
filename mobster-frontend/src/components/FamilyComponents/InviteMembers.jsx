import { useState, useContext, useEffect } from "react";
import { Button, InputGroup, FormControl, Form } from "react-bootstrap";
import { Context } from "../../utils/store";
import { Typeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './invite.css'
import axios from "axios";


const InviteMembers = () => {
  const [context, updateContext] = useContext(Context);
  const [selected, setSelected] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
    //not member, not blocked member
  }, []);
  
  const fetchUsers = async () => {
    const response = await axios.get(`https://localhost:44304/api/User`)
    .then((res) => {
      console.log("Success: ", res.data);
      setUsers(res.data)
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }

  const onSelect = (data) =>{
    setSelected(data)
    console.log(data);
    // updateContext({currentAdmin: data[0]})
  }
  
  return (
  <div className="container">
      <Form.Group>
        <Form.Label>Add members</Form.Label>
        <Typeahead
          id="basic-typeahead-multi"
          multiple
          labelKey="userName"
          onChange={(e) => onSelect(e)}
          options={context.allUsers}
          placeholder="Type an username"
          selected={selected}
        />
      </Form.Group>
      <Button onClick={() => alert('To fix')}>Add</Button>
  </div>
  );
};

export default InviteMembers;
