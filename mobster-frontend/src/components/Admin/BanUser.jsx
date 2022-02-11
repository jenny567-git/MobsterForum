import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocalStorage } from "../../CustomHooks/useLocalStorage"
import { getAuthenticationHeader, getAudience } from "../../CustomHooks/useAutenticationHeader";

function BanUser() {
    const [loggedInUser, setLoggedInUser] = useState(useLocalStorage('user', null))
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [showBlockModal, setShowBlockModal] = useState(false);
    const {getAccessTokenSilently} = useAuth0();
    let [chosenUser, setChosenUser] = useState({});
    let [isLoaded, setLoadedState] = useState(false);
    let searchbar = document.querySelector('#searchbar');
    let searchString = '';

    useEffect(() => {
        if(isLoaded == false){
            if(searchString == '' || searchString == null){
                fetchUsers();
                setLoadedState(true);
            }
            else{
                fetchUsers();
                setLoadedState(true);
            }
        }
    })

    const getAccessToken = async () => {
        const audience = getAudience();
        const token = await getAccessTokenSilently({
          audience: audience,
        });
        return token;
      }
    
    const fetchUsers = async () => {
        const response = await axios.get('https://localhost:44304/api/User');
        console.log(response);
        setUsers(response.data);
        setFilteredUsers(response.data);
    }

    async function toggleUserBlock(user) {
        const token = await getAccessToken();
        const header = getAuthenticationHeader(token);
        const response = await axios.put(`https://localhost:44304/api/Block?userId=${user.userId}`, {}, header);
        setLoadedState(false);
        searchbar.value = '';
        searchString = '';
        closeModal();
    }

    function filterUsersBySearchString(){
        setFilteredUsers(users.filter(function (result) {
            console.log(result);
            return result.userName.toLowerCase().includes(searchString.toLowerCase());
        }))
    }

    function handleKeyUp() {
        function timer() {
            searchString = searchbar.value;
            console.log(searchString);
            filterUsersBySearchString();
        }
        setTimeout(timer, 0); // TODO: Set timer to what ever delay we want when going live
    }

    function openModal(userData) {
        console.log('opened modal')
        console.log('user: ', userData)
        console.log('user ID: ', userData.userId);
        setChosenUser(userData);
        setShowBlockModal(true);
        console.log(showBlockModal);
    }

    function closeModal() {
        setChosenUser({});
        setShowBlockModal(false);
    }

    return (
        <div className="outer-wrapper">
            <div className="inner-wrapper">
                <div className="users-wrapper">
                    <div className="users-header">
                        <h3>Application User Block</h3>
                        <p>Give a user "The mark of a traitor" and block them from every part of the application or forgive them for their sins and let them back in!</p>
                        <hr></hr>
                    </div>
                    <div className="users-search">
                        <input onKeyUp={handleKeyUp} type="text" placeholder="search user" className="searchbar" id="searchbar"/>
                    </div>
                    <div className="users-list">
                        {filteredUsers.map( (user ,index) => (
                            loggedInUser[0].userName !== user.userName && (
                                <div key={index} className="user-detail">
                                    {user.userName}
                                    {user.isBanned ? (
                                        <button value={user} onClick={() => openModal(user)} className="button unblock">Forgive</button>
                                            ) : (
                                        <button value={user} onClick={() => openModal(user)} className="button block">Mark as traitor</button>
                                    )}
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
            <Modal show={showBlockModal} onHide={() => closeModal()} centered>
                <Modal.Header>
                    {chosenUser.isBanned ? (<Modal.Title>Forgive</Modal.Title>) : (<Modal.Title>Mark as traitor</Modal.Title>)}
                </Modal.Header>
                <Modal.Body>
                    {chosenUser.isBanned ? (<span>Are you sure you want to forgive this member?</span>) : (<span>Are you sure you want to give this user "The mark of a traitor"?</span>)}
                </Modal.Body>
                <Modal.Footer>
                    {chosenUser.isBanned ? (<Button onClick={() => toggleUserBlock(chosenUser)}>Forgive</Button>) : (<Button variant="danger" onClick={() => toggleUserBlock(chosenUser)}>Mark as traitor</Button>)}
                    <Button variant="secondary" onClick={() => closeModal()}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default withAuthenticationRequired(BanUser, {});