import React from 'react';
import "../../App.css";

const Panel = ({ setActivePage }) => {
    return (
        <div className="main-side-panel">

            <h2>Admin Panel</h2>

            <nav>
                <div>
                    <button onClick={() => setActivePage("dashboard")}>
                        Dashboard
                    </button>
                </div>

                <div>
                    <button onClick={() => setActivePage("users")}>
                        Users
                    </button>
                </div>


                {/* <div>
                    <button onClick={() => setActivePage("settings")}>
                        Settings
                    </button>
                </div> */}
            </nav>

        </div>
    );
};

export default Panel;