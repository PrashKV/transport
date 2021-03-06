import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

const AdminDashBoard = () => {
    const {
        user: { name, email },
    } = isAuthenticated();

    const adminLeftSide = () => {
        return (
            <div className="card">
                <h4 className="card-header">Admin navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item liss">
                        <Link to="/user/edit" className="nav-link text-dark">
                            Edit profile
                        </Link>
                    </li>
                    <li className="list-group-item liss">
                        <Link
                            to="/admin/create/bus"
                            className="nav-link text-dark"
                        >
                            Create bus
                        </Link>
                    </li>
                    <li className="list-group-item liss">
                        <Link
                            to="/admin/bus/manage"
                            className="nav-link text-dark"
                        >
                            Manage buses
                        </Link>
                    </li>
                    <li className="list-group-item liss">
                        <Link
                            to="/admin/create/record"
                            className="nav-link text-dark"
                        >
                            Create record
                        </Link>
                    </li>
                    <li className="list-group-item liss">
                        <Link to="/records" className="nav-link text-dark">
                            View records
                        </Link>
                    </li>
                    <li className="list-group-item liss">
                        <Link to="/tickets" className="nav-link text-dark">
                            View tickets
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const adminRightSide = () => {
        return (
            <div className="card text-start">
                <h4 className="card-header">Admin Information</h4>
                <ul className="list-group ">
                    <li className="list-group-item">
                        <span className="badge bg-success me-3">Name:</span>
                        {name}
                    </li>
                    <li className="list-group-item">
                        <span className="badge bg-success me-3">Email:</span>
                        {email}
                    </li>
                    <li className="list-group-item">
                        <span className="badge bg-danger me-3">Admin area</span>
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <Base
            title="Welcome to Admin area"
            description="Manage the website"
            className="container bg-info p-4 mt-5"
        >
            <div className="row m-2">
                <div className="col-3">{adminLeftSide()}</div>
                <div className="col-9">{adminRightSide()}</div>
            </div>
        </Base>
    );
};

export default AdminDashBoard;
