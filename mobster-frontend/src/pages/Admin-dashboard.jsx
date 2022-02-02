import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

function AdminDashboard() {

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
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
        const response = await axios.put(`https://localhost:44304/api/Block?userId=${user.userId}`);
        console.log(`ToggleUserBlock, Response Status Code: ${response.status}`);
        setLoadedState(false);
        searchbar.value = '';
        searchString = '';
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
        setTimeout(timer, 0); // TODO: Set timer to what ever delay we want when
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
                                    <button value={user} onClick={() => {
                                        window.confirm('Are you sure you want to unblock this user?') ? toggleUserBlock(user) : {} 
                                    }} className="button unblock">Unblock</button>
                                        ) : (
                                    <button value={user} onClick={() => {
                                        window.confirm('Are you sure you want to block this user?') ? toggleUserBlock(user) : {} 
                                    }} className="button block">Block</button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;