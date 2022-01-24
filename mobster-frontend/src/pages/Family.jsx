import React, { useState, useContext } from "react";
import FakeThread from "../components/Fakes/FakeThread";
import { Context } from "../utils/store";
import { useNavigate } from "react-router-dom";
import EditFamily from "../components/FamilyComponents/EditFamily";
import { Modal, Button } from "react-bootstrap";

const Family = () => {
  const [context, updateContext] = useContext(Context);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  let navigate = useNavigate();

  const toInviteLink = () => {
    navigate("/");
    //redirect to user list? or an component with search user function +add button
  };

  const toggleEdit = () => {
    isEditing ? setIsEditing(false) : setIsEditing(true);
  };

  //working
  const toManipulate = () => {
    //test to manipulate context
    let family = {
      ...context.family,
    };
    family.memberCount = -10;
    updateContext({
      family: family,
      test: "new",
    });
};

const toMembers = () => {
    //redirect to members list -> new component
  }

  const toJoin = () => {
    //fetch api
  };

  const onDelete = () => {
    //fetch api
  };

  const onCreate = () => {
    navigate("/family/create");
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  let myStyle = {
    backgroundColor: 'red'
  };

  return (
    <div>
        <p>Hämtad från context:</p>
      <h1>{context.family.name}</h1>
      <h1>{context.test}</h1>
      <p>Members: {context.family.memberCount}</p>
      <Button style={myStyle} onClick={toInviteLink}>Invite (Link)</Button>
      <button onClick={toJoin} disabled>
        Join
      </button>
      <button onClick={toggleEdit}>Edit</button>
      {/* <button onClick={toManipulate}> Mainpulate context</button> */}
      <button onClick={toMembers}> List of members</button>
      <button onClick={handleShow}>Delete family</button>
      <button onClick={onCreate}>Create new family</button>
      {isEditing && <EditFamily />}
      <FakeThread />
      <FakeThread />
      <FakeThread />
      
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>This family will be permanently be removed</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Confirm delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Family;
