import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

const UserDashBoard = () => {
    const {
        user: { name, email },
    } = isAuthenticated();

    const userLeftSide = () => {
        return (
            <div className="card">
                <h4 className="card-header">User navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item liss">
                    <Link
                            to="/user/edit"
                            className="nav-link text-dark"
                        >
                            Edit Profile
                        </Link>
                    </li>
                    
                </ul>
            </div>
        );
    };

    const userRightSide = () => {
        return (
            <div className="card text-start">
                <h4 className="card-header">User Information</h4>
                <ul className="list-group ">
                    <li className="list-group-item">
                        <span className="badge bg-success me-3">
                            Name:
                        </span>
                        {name}
                    </li>
                    <li className="list-group-item">
                        <span className="badge bg-success me-3">
                            Email:
                        </span>
                        {email}
                    </li>
                    <li className="list-group-item">
                        <span className="badge bg-danger me-3">
                            User area
                        </span>
                        
                    </li>

                </ul>
            </div>
        );
    };

    return (
        <Base
            title="Welcome to User area"
            description="User"
            className="container bg-info p-4 mt-5"
        >
            <div className="row m-2">
                <div className="col-3">{userLeftSide()}</div>
                <div className="col-9">{userRightSide()}</div>
            </div>
        </Base>
    );
};

export default UserDashBoard;
