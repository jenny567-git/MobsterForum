import { useState, useContext } from "react";
import { Button, InputGroup, FormControl, Form } from "react-bootstrap";
import { Context } from "../../utils/store";
import { Typeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css';

const Searchbar2 = () => {
  const [context, updateContext] = useContext(Context);
  const [selected, setSelected] = useState([]);

  const onSelect = (data) =>{
    setSelected(data)
    updateContext({currentAdmin: data[0]})
  }

  return (
    <div>
      <Form.Group>
        <Form.Label>Find user</Form.Label>
        <Typeahead
          id="basic-typeahead-single"
          labelKey="userName"
          onChange={(e) => onSelect(e)}
          options={context.familyMembers}
          placeholder="Type an username"
          selected={selected}
        />
      </Form.Group>
    </div>
  );
};

export default Searchbar2;
