import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditFamily from "../components/FamilyComponents/EditFamily";
import { Modal, Button, Alert,  Form, FloatingLabel } from "react-bootstrap";
import Thread from "../components/Thread/Thread";
import InviteMembers from "../components/FamilyComponents/InviteMembers";
import { getAuthenticationHeader, getAudience } from "../CustomHooks/useAutenticationHeader";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useLocalStorage } from "../CustomHooks/useLocalStorage";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/FamilyComponents/family-override.css";
import "/src/index.css";
import Welcome from "../components/Welcome";

const Family = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showAddThreadModal, setShowAddThreadModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [canJoin, setCanJoin] = useState(false);
  const [canLeave, setCanLeave] = useState(false);
  const [family, setFamily] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  const [state, setState] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const {getAccessTokenSilently} = useAuth0();
  const [newThread, setNewThread] = useState({
    familyId: "",
    title: "",
    content: "",
    authorId: "",
  });
  const [threadSuccess, setThreadSuccess] = useState(false);
  const [threadError, setThreadError] = useState(false);
  const { id } = useParams();
  let navigate = useNavigate();

  const [user, setuser] = useLocalStorage("user", null);

  useEffect(() => {
    fetchFamily();
    checkJoinable();
    checkLeave();
  }, [canJoin, state, threadSuccess]);

  const fetchFamily = async () => {
    const response = await axios
      .get(`https://localhost:44304/api/Family/${id}`)
      .then((res) => {
        console.log("Success: ", res.data);
        setFamily(res.data);
        setIsFetching(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const checkJoinable = async () => {
    console.log("user", user);
    const blockResponse = await axios.get(
      `https://localhost:44304/api/Block?familyId=${id}`
    );

    var blocklist = blockResponse.data ? blockResponse.data : [];

    const memberResponse = await axios.get(
      `https://localhost:44304/api/Family/${id}/members`
    );
    //check if current user is not a member of the group and not a blocked member
    if (
      user &&
      !memberResponse.data.some((e) => e.authId === user.authId) &&
      !blocklist.some((e) => e.authId === user.authId)
    ) {
      console.log("can join");
      setCanJoin(true);
    }
  };

  const checkLeave = async () => {
    const memberResponse = await axios.get(
      `https://localhost:44304/api/Family/${id}/members`
    );
    if (user && memberResponse.data.some((e) => e.authId === user.authId)) {
      console.log("can leave");
      setCanLeave(true);
    }
  };

  const toggleEdit = () => {
    isEditing ? setIsEditing(false) : setIsEditing(true);
  };

  const getAccessToken = async () => {
    const audience = getAudience();
    const token = await getAccessTokenSilently({
      audience: audience,
    });
    return token;
  }

  const toJoin = async () => {
    const token = await getAccessToken();
    const header = getAuthenticationHeader(token);
    const url = `https://localhost:44304/addMember?familyId=${id}&userId=${user.userId}`
    const res = await fetch(url, {
        method: 'POST', 
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
        setShowJoinModal(true);
        console.log("Success: ", res.data);
        let newfamily = { ...family };
        newfamily.memberCount++;
        setFamily(newfamily);
        setCanJoin(false);
        setCanLeave(true);
  };

  const toLeave = async () => {
    const token = await getAccessToken();
    const header = getAuthenticationHeader(token);
    await axios
    .delete(
      `https://localhost:44304/removeUser?familyId=${id}&userId=${user.userId}`, header
      )
      .then((res) => {
        setShowLeaveModal(true);
        console.log("Success: ", res.data);
        let newfamily = { ...family };
        newfamily.memberCount--;
        setFamily(newfamily);
        setCanJoin(true);
        setCanLeave(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log(family);
  };
  
  const postThread = async () => {
    let thread = {...newThread, authorId: user.userId, familyId: id}
    const token = await getAccessToken();
    const header = getAuthenticationHeader(token);
    console.log(thread);
    await axios.post("https://localhost:44304/api/Thread", thread, header)
    .then((res) => {
      setThreadSuccess(true)
    })
    .catch((error) => {
      setThreadError(true)
    });
    const timer = setTimeout(() => {
      setShowAddThreadModal(false);
      setThreadError(false);
      setThreadSuccess(false);
      setNewThread({
        familyId: "",
        title: "",
        content: "",
        authorId: "",
      })
    }, 2000);
  };

  const onDelete = async() => {
    const token = await getAccessToken();
    const header = getAuthenticationHeader(token);
    axios
      .delete(`https://localhost:44304/api/Family?familyId=${id}`, header)
      .then(() => {
        setSuccess(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(true);
      });
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);
  };

  if (!user) {
    return (
      <div className="container">
        <h1>{family.name}</h1>
        <h2>
          <i>{family.description}</i>
        </h2>
        <p>Members: {family.memberCount}</p>
        <Welcome/>
      </div>
    );
  }

  return (
    <div className="flex-space">
      <div className="pad">
        <h1>{family.name}</h1>
        <h2>
          <i>{family.description}</i>
        </h2>
        <p>Members: {family.memberCount}</p>
     
       
      {canJoin && <Button onClick={toJoin}>Join</Button>}
      {canLeave && <Button onClick={toLeave}>Leave</Button>}
      {canLeave && <Button onClick={() => setShowAddThreadModal(true)}>Add Thread</Button>}
      {/*if current user == admin or site admin, display Add/Edit/Delete button*/}
      {user &&
        (user.roles.includes("admin") || user.userId == family.adminUserId) && (
          <>
            <Button onClick={() => setShowInviteModal(true)}>
              Add members
            </Button>
            <Button onClick={toggleEdit}>Edit</Button>
            <Button onClick={() => navigate(`/family/${id}/members`)}>
              {" "}
              Handle members
            </Button>
            <Button onClick={() => setShowDeleteModal(true)}>
              Delete family
            </Button>
          </>
        )}
         </div>

      {isEditing && (
        <EditFamily stateChanger={setState} isEdit={setIsEditing} />
      )}

      <ul>
        {!isFetching &&
          family.threads &&
          Array.from(family.threads).map((thread) => (
            <Thread key={thread.threadId} thread={thread} />
          ))}
        <div className="create-thread">
          {!family.threads && <p>There are no threads in this family yet...</p>}
        </div>
        
      </ul>

      {/* INVITE MODAL */}
      <Modal
        show={showInviteModal}
        onHide={() => setShowInviteModal(false)}
        centered
        className="modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add members</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InviteMembers familyId={id} stateChanger={setState} />
        </Modal.Body>
      </Modal>

      {/* JOIN MODAL */}
      {user && (
        <Modal
          show={showJoinModal}
          onHide={() => setShowJoinModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Welcome {user.userName}!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You're now a part of the family :)</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowJoinModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      
      {/* ADD THREAD MODAL */}
      {user && (
        <Modal
          show={showAddThreadModal}
          onHide={() => setShowAddThreadModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Add thread</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="edit-fam">
              <FloatingLabel
              controlId="TitleLabel"
              label="Thread title"
              style={{color: "black"}}
            >
              <Form.Control
                as="textarea"
                value={newThread.title}
                onChange={(e) =>
                  setNewThread({
                    ...newThread,
                    title: e.target.value,
                  })}
                  />
            </FloatingLabel>
              <FloatingLabel style={{color: "black"}} controlId="threadContent" label="Content">
              <Form.Control
                as="textarea"
                value={newThread.content}
                onChange={(e) =>
                  setNewThread({
                    ...newThread,
                    content: e.target.value,
                  })}
                style={{ height: "100px" }}
              />
            </FloatingLabel>
            {threadSuccess && <Alert variant="success">Success</Alert>}
          {threadError && <Alert variant="danger">Error</Alert>}
          </div>
          </Modal.Body>
          <Modal.Footer>
          <button onClick={postThread} className="post-button"><p>Post</p>                    </button>
            <button className="post-button" onClick={() => setShowAddThreadModal(false)}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      )}
      {/* LEAVE MODAL */}
      {user && (
        <Modal
          show={showLeaveModal}
          onHide={() => setShowLeaveModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Goodbye {user.userName}!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You're no longer a part of the family</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowLeaveModal(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* DELETE MODAL */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>This family will be permanently be removed</p>
          {success && <Alert variant="success">Success</Alert>}
          {error && <Alert variant="danger">Error</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowDeleteModal(false)}>Close</Button>
          <Button variant="danger" onClick={onDelete}>
            Confirm delete
          </Button>
        </Modal.Footer>
      </Modal>


    </div>
  );
};

export default Family;
