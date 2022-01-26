import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, FloatingLabel, Modal } from "react-bootstrap";
import { Context } from "../../utils/store";
import Searchbar from "./Searchbar2";

const EditFamily = () => {
  const [context, updateContext] = useContext(Context);
  const [loading, setloading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [members, setmembers] = useState();

  //useState with object, how to partial update object
  //https://stackoverflow.com/questions/54150783/react-hooks-usestate-with-object
  const [familyName, setfamilyName] = useState("");
  const [description, setDescription] = useState("");
  const [admin, setAdmin] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetchFamily();
  }, []);

  const fetchFamily = async () => {
    const response = await axios.get(
      `https://localhost:44304/api/Family/${id}`
    );
    setfamilyName(response.data.name);
    setDescription(response.data.description);
    updateContext({currentAdmin: {userName: response.data.adminName, userId:response.data.adminUserId}})
    setloading(false);
  };

  const onSubmit = async () => {
    let updatedFamily = {
      Name: familyName,
      Description: description,
      AdminId: context.currentAdmin.userId,
    };
    await axios
      .put(`https://localhost:44304/api/Family?familyId=${id}`, updatedFamily)
      .then((res) => {
        console.log("Success: ", res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    //how to update parent component without refreshing page? context?
    setSuccess(true);
    const timer = setTimeout(() => {
      window.location.reload(false);
    }, 1500);
  };

  const handleClose = () => setShowModal(false);
  const handleShow = async () => {
    const response2 = await axios.get(
      `https://localhost:44304/api/Family/${id}/members`
    );
    updateContext({ familyMembers: response2.data });
    setShowModal(true);
  };

  return (
    <>
      {/* {!loading && ( */}
      <div>
        {success && (
          <p style={{ color: "green" }}>
            Successfully added! Updated in 2 seconds...
          </p>
        )}
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
        <Button variant="success" onClick={handleShow}>
          Change admin
        </Button>
        <Button onClick={onSubmit}>Save changes</Button>

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Change admin</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Searchbar />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose}>Select</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default EditFamily;
