import React, { useState, useEffect } from "react";

import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import {
    getAllticket,
    deleteticket,
    getEveryTicket,
} from "./helper/adminapicall";

const ViewTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user, token } = isAuthenticated();

    const preload = () => {
        setLoading(true);

        getEveryTicket(user._id, token).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setTickets(data);
            }
            setLoading(false);

        });
    };
    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        );
    };
    useEffect(() => {
        preload();
    }, []);

    const expired = (date) => {
        var dateobj = new Date(Date.now());
        dateobj.setHours(new Date().getHours() + 5);
        dateobj.setMinutes(new Date().getMinutes() + 30);
        return new Date(dateobj.toISOString().split("T")[0]) > new Date(date);
    };

    return (
        <Base
            title="Welcome admin"
            description="Manage tickets here"
            className=""
        >
            <Link className="btn btn-warning" to={`/admin/dashboard`}>
                <span className="">Admin Dashboard</span>
            </Link>
            <h2 className="my-4 ">All tickets:</h2>
            <hr />
            {loadingMessage()}
            <div className="d-flex justify-content-center">
                <div className="col-8">
                    <ol>
                        {tickets.map((ticket, index) => {
                            return (
                                <li
                                    key={index}
                                    className={
                                        expired(ticket.doj.split("T")[0])
                                            ? "container expired mt-3 p-2"
                                            : "container notexpired mt-3 p-2 "
                                    }
                                >
                                    <div className="row px-2">
                                        <div className="col-8 text-start">
                                            Ticket ID - {ticket._id}
                                        </div>
                                        <div className="col text-end">
                                            DOJ:<span className="fw-bold">{ticket.doj.split("T")[0]}</span>
                                        </div>
                                    </div>
                                    <div className="row px-2">
                                        <div className="col text-start">
                                            User ID - {ticket.user}
                                        </div>
                                        <div className="col text-end">
                                            Seats:{ticket.seats}
                                        </div>
                                    </div>
                                    <div className="row p-2">
                                        <div className="col-8 text-start fs-5">
                                            { ticket.source} → {ticket.destination}
                                        </div>
                                        <div className="col d-flex align-items-end justify-content-end">
                                            Total:<span className="fw-bold">₹{ticket.total}</span>

                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </div>
        </Base>
    );
};

export default ViewTickets;
