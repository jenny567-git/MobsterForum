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
  const [isFetching, setIsFetching] = useState(true);
  const [blockedMembers, setBlockedMembers] = useState();
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

    const blockResponse = await axios.get(
      `https://localhost:44304/api/Block?familyId=${id}`
    );
    setBlockedMembers(blockResponse.data)
    console.log('blocked', blockResponse.data);

    setIsFetching(false);
    console.log(response.data);
    console.log("members", response.data.familyMembers);
    console.log("user", user);
    // console.log("threads", response.data.threads);
    if (!isLoading) {
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
      <Button onClick={() => navigate(`/family/${id}/invite`)}>Invite</Button>

      {/* add a check, if current user is not a family member - display Join button */}
      {/* add a check, if blocked member, cant join */}
      {canJoin && <Button onClick={toJoin}>Join</Button>}

      {/*if current user == admin or site admin, display Edit button */}
      {!isLoading &&
        (user["https://rules.com/claims/user_metadata"].roles.includes("admin") ||
          user["https://rules.com/claims/user_metadata"].uuid == family.adminUserId) && 
        (
          <>
            <Button onClick={toggleEdit}>Edit</Button>
            <Button onClick={() => navigate(`/family/${id}/members`)}>
              {" "}
              Handle members
            </Button>
            <Button variant="danger" onClick={handleShow}>
              Delete family
            </Button>
          </>
        )}

      {/* <button onClick={toManipulate}> Mainpulate context</button> */}

      {/* add a check, if current user == admin, display Delete button */}
      
      {/* to be moved */}
      <Button variant="success" onClick={() => navigate("/family/create")}>
        Create new family
      </Button>

      {isEditing && <EditFamily />}

      <ul>
        {!isFetching &&
          Array.from(family.threads).map((thread) => (
            <li
              key={thread.threadId}
              onClick={() => navigate(`/thread/${thread.threadId}`)}
            >
              {thread.title}
            </li>
          ))}
      </ul>

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
