import React from "react";
import "../../App.css";

const Dashboard = ({total}) => {
    return (
        <div className="dashboard">

            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p>Welcome to the Admin Dashboard.</p>
            </div>

            <div className="dashboard-cards">

                <div className="dashboard-card">
                    <h3>Total Users</h3>
                    <h2>{total}</h2>
                </div>

                <div className="dashboard-card">
                    <h3>Active Users</h3>
                    <h2>{total}</h2>
                </div>


            </div>

        </div>
    );
};

export default Dashboard;