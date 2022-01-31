import React, { useState, useContext, useEffect } from "react";
import FakeThread from "../components/Fakes/FakeThread";
import { Context } from "../utils/store";
import { useNavigate, useParams } from "react-router-dom";
import EditFamily from "../components/FamilyComponents/EditFamily";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const Family = () => {
  const [context, updateContext] = useContext(Context);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [canJoin, setCanJoin] = useState(false);
  const [family, setFamily] = useState({});
  const { id } = useParams();
  let navigate = useNavigate();

  const { user, isLoading } = useAuth0();

  useEffect(() => {
    fetchFamily();
  }, []);

  const fetchFamily = async () => {
    const response = await axios.get(
      `https://localhost:44304/api/Family/${id}`
    );
    setFamily(response.data);
    console.log(response.data);
    console.log(response.data.familyMembers);
    console.log(user);
    if(!isLoading){
      if (!response.data.familyMembers.some((e) => e.authId === user.sub)) {
      setCanJoin(true);
    }
  }
    // setloading(false);
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

  const toJoin = () => {
    //hard coded, to be replaced
    // let userid = "507DED86-5B40-4A96-ACAF-F847AB7AE72E";
    // axios
    //   .post(`https://localhost:44304/addMember?familyId=${id}&userId=${userid}`)
    //   .then((res) => {
    //     console.log("Success: ", res.data);
    //     alert('You have joined the family');
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
    //   // let family = {...family};
    //   // family.memberCount++;
    //   // setFamily(family);
    console.log(family);
  };

  const onDelete = () => {
    axios
      .delete(`https://localhost:44304/api/Family?familyId=${id}`)
      .then(() => {
        alert("Family deleted");
      });
    //add message: will be redirected after 5 sec
    const timer = setTimeout(() => {
      handleClose();
      navigate("/");
    }, 5000);
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  let myStyle = {
    backgroundColor: "gray",
  };

  return (
    <div className="container">
      {/* <p>Hämtad från context:</p>
      <h1>{context.family.name}</h1>
      <h1>{context.test}</h1>
      <p>Members: {context.family.memberCount}</p>
       */}
      <h1>{family.name}</h1>
      <h2>
        <i>{family.description}</i>
      </h2>
      <p>Members: {family.memberCount}</p>
      <Button style={myStyle} onClick={() => navigate("/")}>
        Home
      </Button>
      <Button onClick={() => navigate(`/family/${id}/invite`)}>Invite</Button>

      {/* add a check, if current user is not a family member - display Join button */}
      {/* add a check, if blocked member, cant join */}
      {canJoin && <Button onClick={toJoin}>Join</Button>}

      {/* add a check, if current user == admin, display Edit button */}
      <Button onClick={toggleEdit}>Edit</Button>

      {/* <button onClick={toManipulate}> Mainpulate context</button> */}
      <Button onClick={() => navigate(`/family/${id}/members`)}>
        {" "}
        Handle members
      </Button>

      {/* add a check, if current user == admin, display Delete button */}
      <Button variant="danger" onClick={handleShow}>
        Delete family
      </Button>

      {/* to be moved */}
      <Button variant="success" onClick={() => navigate("/family/create")}>
        Create new family
      </Button>

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
          <Button variant="danger" onClick={onDelete}>
            Confirm delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Family;
