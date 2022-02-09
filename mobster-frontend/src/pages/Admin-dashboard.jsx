import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminDashboard() {

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [showBlockModal, setShowBlockModal] = useState(false);
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

    const fetchUsers = async () => {
        const response = await axios.get('https://localhost:44304/api/User');
        console.log(response);
        setUsers(response.data);
        setFilteredUsers(response.data);
    }

    async function toggleUserBlock(user) {
        console.log(user);
        const response = await axios.put(`https://localhost:44304/api/Block?userId=${user.userId}`);
        console.log(`ToggleUserBlock, Response Status Code: ${response.status}`);
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
                        <p>Block a Mobster user and give them the "Mark of a traitor" which blocks them from communicating with other members in every part of the application</p>
                        <hr></hr>
                    </div>
                    <div className="users-search">
                        <input onKeyUp={handleKeyUp} type="text" placeholder="search user" className="searchbar" id="searchbar"/>
                    </div>
                    <div className="users-list">
                        {filteredUsers.map( (user ,index) => (
                            <div key={index} className="user-detail">
                                {user.userName}
                                {user.isBanned ? (
                                    <button value={user} onClick={() => openModal(user)} className="button unblock">Unblock</button>
                                        ) : (
                                    <button value={user} onClick={() => openModal(user)} className="button block">Block</button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Modal show={showBlockModal} onHide={() => closeModal()} centered>
                <Modal.Header>
                    {chosenUser.isBanned ? (<Modal.Title>Unblock user</Modal.Title>) : (<Modal.Title>Block user</Modal.Title>)}
                </Modal.Header>
                <Modal.Body>
                    {chosenUser.isBanned ? (<span>Are you sure you want to unblock this user?</span>) : (<span>Are you sure you want to block this user?</span>)}
                </Modal.Body>
                <Modal.Footer>
                    {chosenUser.isBanned ? (<Button onClick={() => toggleUserBlock(chosenUser)}>Unblock</Button>) : (<Button variant="danger" onClick={() => toggleUserBlock(chosenUser)}>Block</Button>)}
                    <Button variant="secondary" onClick={() => closeModal()}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default withAuthenticationRequired(AdminDashboard, {});