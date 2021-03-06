import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, FloatingLabel, Modal, Alert } from "react-bootstrap";
import { Context } from "../../utils/store";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getAuthenticationHeader, getAudience } from "../../CustomHooks/useAutenticationHeader";
import { useAuth0 } from "@auth0/auth0-react";

const EditFamily = ({stateChanger, isEdit}) => {
  const [context, updateContext] = useContext(Context);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState([]);

  //useState with object, how to partial update object
  //https://stackoverflow.com/questions/54150783/react-hooks-usestate-with-object
  const [familyName, setfamilyName] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();

  const {getAccessTokenSilently} = useAuth0();

  useEffect(() => {
    fetchFamily();
  }, []);

  const fetchFamily = async () => {
    const response = await axios.get(
      `https://localhost:44304/api/Family/${id}`
    );
    setfamilyName(response.data.name);
    setDescription(response.data.description);
    updateContext({
      currentAdmin: {
        userName: response.data.adminName,
        userId: response.data.adminUserId,
      },
    });
  };

  const onSubmit = async () => {
    let updatedFamily = {
      Name: familyName,
      Description: description,
      AdminId: context.currentAdmin.userId,
    };

    const token = await getAccessToken();
    const header = getAuthenticationHeader(token);
    await axios
      .put(`https://localhost:44304/api/Family?familyId=${id}`, updatedFamily, header)
      .then((res) => {
        console.log("Success: ", res.data);
        setSuccess(true);
        stateChanger('Updated');
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(true);
      });
      setTimeout( () => {
        setSuccess(false);
        setError(false);
        isEdit(false);
      },1500);
  };

  const onSelectAdmin = (data) => {
    setSelected(data);
  };
  const handleClose = () => {
    if(selected.length > 0){
      updateContext({ currentAdmin: selected[0] });
    }
    setShowModal(false);
  };

  const handleShow = async () => {
    const response2 = await axios.get(
      `https://localhost:44304/api/Family/${id}/members`
    );
    updateContext({ familyMembers: response2.data });
    setShowModal(true);
  };

  const getAccessToken = async () => {
    const audience = getAudience();
    const token = await getAccessTokenSilently({
      audience: audience,
    });
    return token;
  }

  const buttonStyles = {
    color: "white",
    backgroundColor: "#ec625f",
    border: "none",
    fontFamily: "Lekton",
    margin: "10px",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "0.5rem"
  }
  return (
    <>
      <div className="edit-fam">
        {success && (
          <Alert variant="success">Success</Alert>
        )}
        {error && <Alert variant="danger">Error. Please try again.</Alert>}
        <FloatingLabel
          controlId="familyNameLabel"
          label="Family name"
          className="mb-3"
        >
          <Form.Control
            as="textarea"
            value={familyName}
            onChange={(e) => setfamilyName(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel controlId="familyDescription" label="Description">
          <Form.Control
            as="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ height: "100px" }}
          />
        </FloatingLabel>
        <p>Current admin: {context.currentAdmin.userName}</p>
        <Button onClick={handleShow}>
          <p>Change admin</p>
        </Button>
        <Button onClick={onSubmit}><p>Save changes</p></Button>

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title ><h4>Change admin</h4></Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div >
              <Form.Group>
                <Form.Label className="dark"><p>Find user</p></Form.Label>
                <Typeahead
                  id="basic-typeahead-single"
                  labelKey="userName"
                  onChange={(e) => onSelectAdmin(e)}
                  options={context.familyMembers}
                  placeholder="Type a username"
                  selected={selected}
                />
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="modal-select"><Button onClick={handleClose}>Select</Button></div>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default EditFamily;
