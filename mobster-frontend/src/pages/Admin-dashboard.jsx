import React from "react";

const selectedUser = "4789243e-72fd-448e-b51b-ccafe4973717";

function ToggleBlockOnUser() {
    
}

function AdminDashboard() {
    return (
        <div class="main-wrapper">
            <h3>Admin dashboard</h3>
            <button onClick={ToggleBlockOnUser()}>Block user</button>
        </div>
    )
}

export default AdminDashboard;