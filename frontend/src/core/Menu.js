import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";

const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#fae900" };
    } else {
        return { color: "#FFFFFF" };
    }
};

const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs" style={{ backgroundColor: "#2a2136" }}>
            <li className="nav-item">
                <Link
                    style={currentTab(history, "/")}
                    className="nav-link"
                    to="/"
                >
                    Home
                </Link>
            </li>
            {isAuthenticated() && (
                <li className="nav-item">
                <Link
                    style={currentTab(history, "/user/tickets")}
                    className="nav-link"
                    to="/user/tickets"
                >
                    Tickets
                </Link>
            </li>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                    <Link
                        style={currentTab(history, "/user/dashboard")}
                        className="nav-link"
                        to="/user/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>)}
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                    <Link
                        style={currentTab(history, "/admin/dashboard")}
                        className="nav-link"
                        to="/admin/dashboard"
                    >
                        A. Dashboard
                    </Link>
                </li>
            )}
            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link
                            style={currentTab(history, "/signup")}
                            className="nav-link"
                            to="/signup"
                        >
                            Sign Up
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            style={currentTab(history, "/signin")}
                            className="nav-link"
                            to="/signin"
                        >
                            Sign In
                        </Link>
                    </li>
                </Fragment>
            )}
            {isAuthenticated() && (
                <li className="nav-item">
                    <span
                        className="nav-link text-info"
                        onClick={() => {
                            signout(() => {
                                history.push("/signin");
                            });
                        }}
                    >
                        Signout
                    </span>
                </li>
            )}
        </ul>
    </div>
);

export default withRouter(Menu);
