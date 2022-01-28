import { useState, useContext } from "react";
import { Button, InputGroup, FormControl, Form } from "react-bootstrap";
import { Context } from "../../utils/store";
import { Typeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './invite.css'



const InviteMembers = () => {
  const [context, updateContext] = useContext(Context);
  const [selected, setSelected] = useState([]);

  const onSelect = (data) =>{
    setSelected(data)
    console.log(data);
    // updateContext({currentAdmin: data[0]})
  }
  
  return (
  <div className="container">
      <Form.Group>
        <Form.Label>Invite user</Form.Label>
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
      <Button onClick={() => alert('To fix')}>Send invitation</Button>
  </div>
  );
};

export default InviteMembers;
