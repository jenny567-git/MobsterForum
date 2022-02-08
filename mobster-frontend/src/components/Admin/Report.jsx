import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const Report = () => {
  const [reports, setReports] = useState([]);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [showContentModal, setShowContentModal] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    axios
      .get(`https://localhost:44304/api/Report`)
      .then((res) => {
        console.log("Success: ", res.data);
        setReports(res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onDelete = (reportId) => {
    //delete report
  };

  const onCensur = (report) => {
    //censur post/thread
    //delete report
  };

  return (
    <div className="outer-wrapper">
      <div className="inner-wrapper">
        <div className="users-wrapper">
          <div className="users-header">
            <h3>Reported users</h3>
            <p>
              Censur a Mobster user's post/thread because this mob didn't follow
              our rules. Judge if this mob is gulity or unguilty of charge.
            </p>
            <hr></hr>
          </div>
          <div className="users-list">
            {reports.map((report) => (
              <div key={report.reportId}>
                <p>#Report</p>
                <p>Assaulter: {report.objectUser.userName}</p>
                <p>Snitcher: {report.subjectUser.userName}</p>
                <p>Date: {report.createdAt}</p>
                <Button onClick={() => setShowContentModal(true)}>
                  Evidence
                </Button>
                <Button onClick={() => setShowReasonModal(true)}>Motive</Button>

                <Modal
                  show={showReasonModal}
                  onHide={() => setShowReasonModal(false)}
                  centered
                  className="modal"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Motive</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>{report.reason}</p>
                  </Modal.Body>
                </Modal>
                <Modal
                  show={showContentModal}
                  onHide={() => setShowContentModal(false)}
                  centered
                  className="modal"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Content</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>{report.content}</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={onCensur(report)}>Guilty</Button>
                    <Button onClick={onDelete(report.reportId)}>Not guilty</Button>
                  </Modal.Footer>
                </Modal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
