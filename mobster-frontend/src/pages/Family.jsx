import React, { useState, useContext, useEffect } from "react";
import FakeThread from "../components/Fakes/FakeThread";
import { Context } from "../utils/store";
import { useNavigate,useParams } from "react-router-dom";
import EditFamily from "../components/FamilyComponents/EditFamily";
import Member from "../components/FamilyComponents/Member";
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';

const Family = () => {
  const [context, updateContext] = useContext(Context);
  const [isEditing, setIsEditing] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [family, setFamily] = useState("");
  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    fetchFamily();
  }, [])

  const fetchFamily = async () => {
    console.log("in fetch get");
    var response = await fetch(
      //hardcoded, to be replaced
      `https://localhost:44304/api/Family/${id}`
    );
    var result = await response.json();
    setFamily(result);
    console.log(result);
    // setloading(false);
  };

  const toInvite = () => {
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
    axios.delete(`https://localhost:44304/api/Family?familyId=${id}`).then( () => {
      alert('Family deleted');
    })
    handleClose();
    navigate('/');
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const toggleMembers = () => {

  }

  let myStyle = {
    backgroundColor: 'gray'
  };

  return (
    <div>

        {/* <p>Hämtad från context:</p>
      <h1>{context.family.name}</h1>
      <h1>{context.test}</h1>
      <p>Members: {context.family.memberCount}</p>
       */}
       <h1>{family.name}</h1>
       <h2>{family.description}</h2>
       <p>Members: {family.memberCount}</p>
      <Button style={myStyle} onClick={() => navigate("/")}>Home</Button>
      <Button onClick={toJoin} disabled>
        Join
      </Button>
      <Button onClick={toggleEdit}>Edit</Button>
      {/* <button onClick={toManipulate}> Mainpulate context</button> */}
      <Button onClick={toggleMembers}> List of members</Button>
      <Button variant="danger" onClick={handleShow}>Delete family</Button>
      <Button variant="success" onClick={() => navigate("/family/create")}>Create new family</Button>
      {isEditing && <EditFamily />}
      {showMembers && <Member />}
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
          <Button variant="danger" onClick={onDelete}>
            Confirm delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Family;
