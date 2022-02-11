import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from '@auth0/auth0-react';
import { useLocalStorage } from "../../CustomHooks/useLocalStorage";
import { Button, Modal } from "react-bootstrap";
import { Post } from "../../components/Post/Post";
import "./SingleThreadView-styling.css";
import "../../components/Thread/thread-styling.css";
import { getAuthenticationHeader, getAudience } from "../../CustomHooks/useAutenticationHeader";

const SingleThreadView = () => {
  const { id } = useParams();
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [thread, setThread] = useState();
  const [isThreadLoaded, setIsThreadLoaded] = useState(false);
  const [isThreadCensored, setIsThreadCensored] = useState();
  const [threadTitle, setThreadTitle] = useState("");
  const [threadContent, setThreadContent] = useState("");
  const [blockedMembers, setBlockedMembers] = useState([]);
  const [isReported, setIsReported] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [btnText, setBtnText] = useState(
    <i className="fas fa-edit" title="Edit thread"></i>
  );
  const [showReportModal, setShowReportModal] = useState(false);
  const {getAccessTokenSilently} = useAuth0();
  const [user, setuser] = useLocalStorage("user", null);
  let navigate = useNavigate();
  
  const getAccessToken = async () => {
    const audience = getAudience();
    const token = await getAccessTokenSilently({
      audience: audience,
    });
    return token;
  }
  // TODO: add error so that "no content found" can be rendered on error
  const fetchThreadById = async () => {
    let response = await axios.get(`https://localhost:44304/api/Thread/${id}`);
    response.data.createdAt = response.data.createdAt.slice(0, 10);
    setThread(response.data);
    setThreadContent(response.data.content);
    setThreadTitle(response.data.title);
    setIsThreadCensored(response.data.isCensored);
    if (response.data) {
      setIsThreadLoaded(true);
    }
  };

  const fetchBlockedMembersByFamilyId = async () => {
    let response = await axios.get(
      `https://localhost:44304/api/Block?familyId=${thread.family.familyId}`
    );
    response.data ? setBlockedMembers(response.data) : setBlockedMembers([]);
    console.log(response.data);
  };

  const checkIfBlockedFromFamily = (author) => {
    let blockedMembersIds = blockedMembers.map((m) => m.userId);
    return blockedMembersIds.includes(author.userId);
  };

  const checkIfUserInFamily = () => {
    if (thread) {
      let familyMembersIds = thread.family.familyMembers.map((m) => m.userId);
      return familyMembersIds.includes(user.userId);
    }
  };

  const deleteThread = async () => {
    const token = await getAccessToken();
    const header = getAuthenticationHeader(token);
    let response = await axios.delete(
      `https://localhost:44304/api/Thread?id=${id}`, {}, header
    );
    console.log(response);
    alert("your thread has been deleted");
    navigate("/");
  };

  function log() {
    console.log(thread);
  }

  const editThread = async () => {
    console.log("hello");
    if (isReadOnly && thread.author.userId == user.userId) {
      setIsReadOnly(false);
      setBtnText(<i className="fas fa-save"></i>);
    } else if (!isReadOnly && thread.author.userId == user.userId) {
      let updatedThread = {
        familyId: thread.family.familyId,
        title: threadTitle,
        content: threadContent,
        authorId: thread.author.userId,
      };
      console.log(updatedThread);
      setIsReadOnly(true);
      setBtnText(<i className="fas fa-edit" title="Save changes"></i>);
      
      const token = await getAccessToken();
      const header = getAuthenticationHeader(token);
      const response = await axios.put(`https://localhost:44304/api/Thread?id=${id}`,updatedThread, header);
      console.log(response);
    }
  };

  const toggleCensorThread = async () => {
    const token = await getAccessToken();
    const header = getAuthenticationHeader(token);
    await axios
      .put(`https://localhost:44304/api/Thread/censor/${id}`, {}, header)
      .catch((error) => {
        console.error("Error:", error);
      });

    setIsThreadCensored(!thread.isCensored);
  };

  const toggleReplyBox = () => {
    // setVisible(!isVisible);
    scrollToBottom();
  };
  function logThread() {
    console.log(thread);
  }

  function getThreadLink() {
    navigator.clipboard.writeText(window.location.href);
    alert("The link has been copied to clipboard")
  }

  function scrollToBottom() {
    let scrollingElement = document.scrollingElement || document.body;
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
  }

  function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  const onReport = async () => {
    let report = {
      subjectUserId: user.userId,
      objectUserId: thread.author.userId,
      reason: reportReason,
      threadId: thread.threadId,
    };
    const token = await getAccessToken();
    const header = getAuthenticationHeader(token);
    await axios.post(`https://localhost:44304/api/Report/`, report, header);
    setIsReported(true);
    setReportReason("");
    setTimeout(() => {
      setIsReported(false);
      setShowReportModal(false);
    }, 2500);

  };

  useEffect(() => {
    fetchThreadById();
    if (isThreadLoaded) {
      fetchBlockedMembersByFamilyId();
    }
  }, [isThreadLoaded, isThreadCensored, isReported]);

  return (
    <div className="SingleThreadView">
      <div className="main-container">
        <div className="single-thread-container">
          {thread && (
            <div className="thread">
              {thread.author.isBanned && (
                <div className="thread-metadata">
                  <span>
                    Posted by{" "}
                    <p>
                      <strong className="thread-metadata-banned">
                        {" "}
                        &#91;Banned User&#93;{" "}
                      </strong>{" "}
                      in{" "}
                      <strong
                        title="Go to family"
                        className="thread-metadata-bold thread-metadata-tofamily"
                        onClick={() =>
                          navigate(`/family/${thread.family.familyId}`)
                        }
                      >
                        {thread.family.name}
                      </strong>{" "}
                      at {thread.createdAt}
                    </p>
                  </span>
                </div>
              )}
              {!thread.author.isActive && (
                <div className="thread-metadata">
                  <span>
                    Posted by{" "}
                    <strong className="thread-metadata-bold">
                      <p>&#91;Deleted User&#93;</p>
                    </strong>{" "}
                    in{" "}
                    <strong
                      title="Go to family"
                      className="thread-metadata-bold thread-metadata-tofamily"
                      onClick={() =>
                        navigate(`/family/${thread.family.familyId}`)
                      }
                    >
                      <p>{thread.family.name}</p>
                    </strong>{" "}
                    at <p>{thread.createdAt}</p>
                  </span>
                </div>
              )}
              {!thread.author.isBanned && thread.author.isActive && (
                <div className="thread-metadata">
                  <span>
                    Posted by{" "}
                    <strong className="thread-metadata-bold">
                      <p>{thread.author.userName}</p>
                    </strong>{" "}
                    in{" "}
                    <strong
                      title="Go to family"
                      className="thread-metadata-bold thread-metadata-tofamily"
                      onClick={() =>
                        navigate(`/family/${thread.family.familyId}`)
                      }
                    >
                      <p>{thread.family.name}</p>
                    </strong>{" "}
                    at <p>{thread.createdAt}</p>
                  </span>
                </div>
              )}

              {isReadOnly && !isThreadCensored && (
                <div className="thread-data">
                  <input value={threadTitle} readOnly></input>
                  <textarea value={threadContent} readOnly></textarea>
                </div>
              )}

              {isThreadCensored && (
                <div className="thread-data">
                  <input value="&#91;Silenced&#93;" readOnly></input>
                  <textarea
                    value="&#91;This mook disrespected the family; their words are silenced.&#93;"
                    readOnly
                  ></textarea>
                </div>
              )}

              {!isReadOnly && (
                <div className="thread-data">
                  <input
                    value={threadTitle}
                    onChange={(e) => setThreadTitle(e.target.value)}
                  ></input>
                  <textarea
                    value={threadContent}
                    onChange={(e) => setThreadContent(e.target.value)}
                    rows="8"
                  ></textarea>
                </div>
              )}

              <div className="thread-btns">
                {!checkIfBlockedFromFamily(user) &&
                  thread.author.userId == user.userId &&
                  !isThreadCensored && (
                    <div className="thread-btns">
                      <Button className="thread-btns" onClick={editThread}>
                        {btnText}
                      </Button>
                      <Button
                        className="thread-btns"
                        onClick={deleteThread}
                        title="Delete thread"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </Button>
                    </div>
                  )}
                {checkIfUserInFamily() && (
                  <Button
                    className="thread-btns"
                    title="Post reply"
                    onClick={toggleReplyBox}
                  >
                    <i className="fas fa-reply"></i>
                  </Button>
                )}
                {!checkIfBlockedFromFamily(user) && (
                  <Button
                    className="thread-btns"
                    title="Share link"
                    onClick={getThreadLink}
                  >
                    <i className="fas fa-share-square"></i>
                  </Button>
                )}
                {checkIfUserInFamily() &&
                  !user.roles.includes("admin") &&
                  thread.author.userId != user.userId &&
                  !thread.isCensored && (
                    <Button
                      className="thread-btns"
                      title="Report thread"
                      onClick={() => setShowReportModal(true)}
                    >
                      <i className="fas fa-exclamation"></i>
                    </Button>
                  )}
                {!checkIfBlockedFromFamily(user) &&
                  user.roles.includes("admin") &&
                  thread.author.userId != user.userId && (
                    <Button
                      className="thread-btns"
                      title="Toggle censor thread"
                      onClick={toggleCensorThread}
                    >
                      <i className="fas fa-comment-slash"></i>
                    </Button>
                  )}
              </div>
            </div>
          )}
          <div className="thread-posts">
            <Post id={id} blockedMembers={blockedMembers} thread={thread} />
          </div>

          <Button className="backtotop-button" onClick={scrollToTop}>
            <p>Back to top</p>
          </Button>
        </div>
      </div>
      <Modal
        show={showReportModal}
        onHide={() => setShowReportModal(false)}
        centered
        className="modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Report</Modal.Title>
        </Modal.Header>
        <div className="thread-data">
          <p>Why are you snitching?</p>
          <input
            type="text"
            onChange={(e) => setReportReason(e.target.value)}
          />
          {isReported && <p>Success</p>}
        </div>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button onClick={onReport}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SingleThreadView;
