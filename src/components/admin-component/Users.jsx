import React from "react";
import "../../App.css";

const Users = ({ users }) => {
    return (
        <div className="users-container">
            <h2>All Users</h2>

            <div className="users-list">
                {users.map((user) => (
                    <div className="user-card" key={user._id}>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Role: {user.role}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Users;