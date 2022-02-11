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

  return (
    <div className="my-families">
      <h3>My Families</h3>
      {error && <h6>You haven't joined any families.</h6>}
      {isFetching && !error && <div>Loading families...</div>}
      {!error && (
        <ul>
          {Array.from(myFamilies).map((family) => (
            <li
              key={family.familyId}
              onClick={() => navigate(`/family/${family.familyId}`)}
            >
              {family.name}
            </li>
          ))}
        </ul>
      )}
      {user && (
        <Button onClick={() => setShowCreateFamilyModal(true)}>
          <p>Create new family</p>
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
