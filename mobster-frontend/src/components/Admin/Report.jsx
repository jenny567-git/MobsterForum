import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const Report = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [showContentModal, setShowContentModal] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  let isCensur = false;
  let count = 1;

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

  const onShowReasonModal = (report) => {
    setSelectedReport(report);
    setShowReasonModal(true);
  };

  const onShowContentModal = (report) => {
    setSelectedReport(report);
    setShowContentModal(true);
  };

  const onDelete = () => {
    //delete report
    axios
      .delete(
        `https://localhost:44304/api/Report?reportId=${selectedReport.reportId}&censur${isCensur}`
      )
      .then((res) => {
        console.log("Success: Delete report", res.data);
      })
      .catch((error) => {
        console.error("Error: Delete report", error);
      });
    if (isCensur) {
      setReports(
        reports.filter(function (report) {
          return (report.postId !== selectedReport.postId && report.threadId !== selectedReport.threadId);
        })
      );
    } else {
      setReports(
        reports.filter(function (report) {
          return report.reportId !== selectedReport.reportId;
        })
      );
    }
    setShowContentModal(false);
    isCensur = false;
  };

  const onCensur = () => {
    if (selectedReport.postId == null) {
      axios.put(
        `https://localhost:44304/api/Thread/censor/${selectedReport.threadId}`
      );
    } else {
      axios.put(
        `https://localhost:44304/api/Posts/censor/${selectedReport.postId}`
      );
    }
    isCensur = true;
    onDelete();
  };

  return (
    <div className="outer-wrapper">
      <div className="inner-wrapper">
        <div className="users-wrapper">
          <div className="users-header">
            <h3>Reported users</h3>
            <p>
              Censur a post/thread because this mob didn't follow our rules.
              Judge if this mob is gulity or unguilty of charge.
            </p>
            <hr></hr>
          </div>
          <div className="users-list">
            {reports && reports.length < 1 && <p>No reports found...</p>}
            {reports.map((report) => (
              <div key={report.reportId} className="report-detail flex space">
                <div>
                  <p>#Report {count++}</p>
                  <p>Assaulter: {report.objectUser.userName}</p>
                  <p>Snitcher: {report.subjectUser.userName}</p>
                  <p>Date: {report.createdAt}</p>
                </div>
                <div>
                  <button
                    onClick={() => onShowContentModal(report)}
                    className="m-2 button block"
                  >
                    Evidence
                  </button>
                  <button
                    onClick={() => onShowReasonModal(report)}
                    className="button block"
                  >
                    Motive
                  </button>
                </div>

{/* REPORT REASON */}
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
                    {selectedReport && <p>{selectedReport.reason}</p>}
                  </Modal.Body>
                </Modal>
                
{/* REPORT CONTENT */}
                <Modal
                  show={showContentModal}
                  onHide={() => setShowContentModal(false)}
                  centered
                  className="modal"
                >
                  <Modal.Header closeButton>
                    {selectedReport && selectedReport.threadTitle ? (
                      <Modal.Title>Content: Thread</Modal.Title>) : (<Modal.Title>Content: Post</Modal.Title> )}
                  </Modal.Header>
                  <Modal.Body>
                    {selectedReport && selectedReport.threadTitle && (
                      <p>Title: {selectedReport.threadTitle}</p>
                    )}
                    {selectedReport && <p>{selectedReport.content}</p>}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={onCensur}>Guilty</Button>
                    <Button onClick={onDelete}>Not guilty</Button>
                    <Button onClick={() => navigate(`/thread/${selectedReport.threadId}`)}>Go to thread</Button>
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
