import axios from "axios";
import React, { useEffect, useState } from "react";

function AdminDashboard() {

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    let [isLoaded, setLoadState] = useState(false);

    const fetchUsers = async () => {
        const response = await axios.get('https://localhost:44304/api/User/allUsers');
        console.log(response);
        setUsers(response.data);
    }

    async function toggleUserBlock(user) {
        console.log(user);
        const response = await axios.put(`https://localhost:44304/api/Block?${user.userId}`);
        console.log(response);
        setLoadState(false);
    }

    useEffect(() => {
        if(isLoaded == false){
            fetchUsers();
        }
        setLoadState(true);
    })

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
                        <input type="text" placeholder="search user" className="searchbar"/>
                    </div>
                    <div className="users-list">
                        {users.map( (user,index) => (
                            <div key={index} className="user-detail">
                                {user.userName}, 
                                {user.isBanned.toString()}
                                {user.isBanned ? (
                                    <button value={user} onClick={() => toggleUserBlock(user)} className="button unblock">Unblock</button>
                                ) : (
                                    <button value={user} onClick={() => toggleUserBlock(user)} className="button block">Block</button>
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