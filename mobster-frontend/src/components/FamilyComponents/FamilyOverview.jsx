import React from 'react';
import { useNavigate} from "react-router-dom";
import "../Thread/thread-styling.css"

const FamilyOverview = ({family}) => {
  let navigate = useNavigate();

  return (
  <div className="thread-container" onClick={() => navigate(`/family/${family.familyId}`)}>
      <div className="thread-title">
        < p className="thread-metadata">with {family.memberCount} member(s)</p>
          <h2>{family.name}</h2>
      </div>
      {family.description.length>100 ? <p className="thread-text">{family.description}</p> : <p className="thread-text">{family.description.slice(0,100)}...</p>}
      <p className="thread-metadata">Click to go to page</p>
  </div>
    );
};

export default FamilyOverview;
