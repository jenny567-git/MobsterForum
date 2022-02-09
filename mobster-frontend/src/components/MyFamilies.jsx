import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { useLocalStorage } from "../CustomHooks/useLocalStorage";
import CreateFamily from "../components/FamilyComponents/CreateFamily";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/FamilyComponents/family-override.css";

function MyFamilies() {
  const [showCreateFamilyModal, setShowCreateFamilyModal] = useState(false);
  const [myFamilies, setFamilies] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(false);
  const [user, setuser] = useLocalStorage("user", null);
  let navigate = useNavigate();

  useEffect(() => {
    fetchFamilies();
  }, []);

  const fetchFamilies = async () => {
    console.log("fetching");
    const families = await axios.get(
      `https://localhost:44304/api/Family/user/${user.userId}`
    );
    setFamilies(families.data);
    if (!families.data.length) {
      setError(true);
    }
    setIsFetching(false);
  };

  if (error)
    return (
      <div className="my-families">
        <h3>My Families</h3>
        <p>You haven't joined any families.</p>
      </div>
    );
    const buttonStyles = {
      color: "white",
      fontFamily: "Lekton",
      margin: "10px",
      fontWeight: "bold",
      cursor: "pointer",
      border: "none",
      borderRadius: "0.5rem",
      backgroundColor: "#ec625f",
      
    }

  // { error && <h2>you haven't joined any families.</h2> }
  return (
    <div className="my-families">
      <h3>My Families</h3>
      {isFetching && <div>Loading families...</div>}
      <ul>
        {Array.from(myFamilies).map((family) => (
          <li
            key={family.familyId}
            onClick={() => navigate(`/family/${family.familyId}`)}
          >
            {family.name}<br></br> <span>Members: {family.memberCount}</span>
          </li>
        ))}
      </ul>
      {user && (
        <Button
          style={buttonStyles}
          variant="success"
          onClick={() => setShowCreateFamilyModal(true)}
        >
          Create new family
        </Button>
      )}

      {/* CREATE FAMILY MODAL */}
      <Modal
        show={showCreateFamilyModal}
        onHide={() => setShowCreateFamilyModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p>Create new family</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateFamily />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}

export default MyFamilies;
