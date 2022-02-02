import axios from "axios";
import React, { useEffect, useState } from "react";

function AdminDashboard() {

    const [users, setUsers] = useState([]);
    let [isLoaded, setState] = useState(false)

    const fetchUsers = async () => {
        const response = await axios.get('https://localhost:44304/api/User/allUsers');
        console.log(response);
        setUsers(response.data);
    }

    async function toggleUserBlock(user) {
        console.log(user);
        const response = await axios.put(`https://localhost:44304/api/Block?${user.userId}`);
        console.log(response);
    }

    useEffect(() => {
        if(isLoaded == false){
            fetchUsers();
        }
        setState(true);
    })

    return (
        <div>
            <h3>Users</h3>
            {users.map( (user,index) => (
                <div key={index} className="wrapper">
                    <p>
                    {user.userName}, 
                    {user.isBanned.toString()}
                    </p>
                    <button value={user} onClick={() => toggleUserBlock(user)}>TEST</button>
                </div>
            )
            )}
        </div>
    )
}

export default AdminDashboard;