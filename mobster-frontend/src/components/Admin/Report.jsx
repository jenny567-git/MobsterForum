import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Report = () => {
    const [reports, setReports] = useState([]);
    useEffect(() => {
      fetchReports();
    }, []);
    
    const fetchReports = async() => {
        axios.get(`https://localhost:44304/api/Report`)
        .then((res) => {
          console.log("Success: ", res.data);
          setReports(res.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

  return (
    <div className="outer-wrapper">
        <div className="inner-wrapper">
            <div className="users-wrapper">
                <div className="users-header">
                    <h3>Reported users</h3>
                    <p>Censur a Mobster user's post/thread because this mob didn't follow our rules</p>
                    <hr></hr>
                </div>
                <div className="users-list">
                    {reports.map( (report ,index) => (
                        // <div key={index} className="user-detail">
                        //     {user.userName}
                        //     {user.isBanned ? (
                        //         <button value={user} onClick={() => {
                        //             // window.confirm('Are you sure you want to unblock this user?') ? toggleUserBlock(user) : {} 
                        //         }} className="button unblock">Unblock</button>
                        //             ) : (
                        //         <button value={user} onClick={() => {
                        //             // window.confirm('Are you sure you want to block this user?') ? toggleUserBlock(user) : {} 
                        //         }} className="button block">Block</button>
                        //     )}
                        // </div>
                        <div key={index}>
                            <p>Report</p> 
                            <p>Assaulter: {report.objectUserId}</p>
                            <p>Reported by: {report.subjectUserId}</p>
                            <p>Evidence: {report.content}</p>
                            <p>Reason: {report.reason}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
)
};

export default Report;
