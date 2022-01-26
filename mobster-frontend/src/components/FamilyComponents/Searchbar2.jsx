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
        {/* <InputGroup className="mb-3">
    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
    <FormControl
      placeholder="Search for username"
      aria-label="Username"
      aria-describedby="basic-addon1"
      onKeyUp={(e) => setSearchString(e.target.value)}
    /> */}
  {/* </InputGroup> */}
      {/* <input
        type="text"
        placeholder="Search for username"
        onKeyUp={(e) => onFilter(e.target.value)}
      />
      <Button onClick={onSearch}>Search</Button> */}
    </div>
  );
};

export default Searchbar2;
