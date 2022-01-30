import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getUserTickets } from "./helper/userapicall";
import _ from "lodash";
const Tickets = () => {
    const [success, setSuccess] = useState(false);
    const [tickets, setTickets] = useState([]);
    const { user, token } = isAuthenticated();

    const expired = (date) => {
        var dateobj = new Date(Date.now());
        dateobj.setHours(new Date().getHours() + 5);
        dateobj.setMinutes(new Date().getMinutes() + 30);
        return new Date(dateobj.toISOString().split("T")[0]) > new Date(date);
    };

    useEffect(() => {
        getUserTickets(user._id, token).then((data) => {
            setSuccess(true);
            setTickets(data.tickets);
        });
    }, [user._id, token]);
    
    return (
        <Base title="Tickets page" description="Confirmed Tickets">
            <div className="d-flex justify-content-center">
                <div className="col-7">
                  
                    {success ? (
                        tickets ? (
                            <div className="text-start">
                                <ol className="">
                                    {tickets.map((indi) => (
                                        <li
                                        key={ indi.createdAt }
                                            className={
                                                expired(indi.doj.split("T")[0])
                                                    ? "container expired mt-3 pt-2"
                                                    : "container notexpired mt-3 pt-2 "
                                            }
                                           
                                        >
                                            <div>
                                                <div className="row">
                                                    <div className="col-6 text-start">
                                                        ID-{indi._id}
                                                    </div>
                                                    <div className="col-6 text-end">
                                                        DOJ:
                                                        <span className="fw-bolder">
                                                            {
                                                                indi.doj.split(
                                                                    "T"
                                                                )[0]
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row fs-5">
                                                    <div className="col-1 text-start">
                                                        From
                                                    </div>

                                                    <div className="col text-start">
                                                        : {indi.source}
                                                    </div>
                                                </div>
                                                <div className="row fs-5">
                                                    <div className="col-1 text-start">
                                                        To
                                                    </div>

                                                    <div className="col text-start">
                                                        : {indi.destination}
                                                    </div>
                                                </div>

                                                <div className="row fs-5">
                                                    <div className="col-1 text-start">
                                                        Seats
                                                    </div>

                                                    <div className="col text-start">
                                                        : {indi.seats}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div>
                                                    <ol>
                                                        {_.map(
                                                            indi.final,
                                                            (mode) => (
                                                                <li key={ mode.source} className="mt-2 text-capitalize">
                                                                    <span className="row lh-1">
                                                                        <span className="fw-bold">
                                                                            {mode.name.toUpperCase()}
                                                                        </span>
                                                                        <span className="col-8">
                                                                            {
                                                                                mode.source
                                                                            }{" "}
                                                                            <span className="fw-bolder">
                                                                                →
                                                                            </span>{" "}
                                                                            {
                                                                                mode.destination
                                                                            }
                                                                        </span>
                                                                        <span className="col-4 text-end">
                                                                            {mode.name ===
                                                                            "taxi" ? (
                                                                                <span>
                                                                                    {Math.ceil(
                                                                                        indi.seats /
                                                                                            4
                                                                                    )}

                                                                                    *
                                                                                    {
                                                                                        mode.price
                                                                                    }
                                                                                    =₹
                                                                                    {mode.price *
                                                                                        Math.ceil(
                                                                                            indi.seats /
                                                                                                4
                                                                                        )}
                                                                                </span>
                                                                            ) : (
                                                                                <span>
                                                                                    {
                                                                                        indi.seats
                                                                                    }

                                                                                    *
                                                                                    {
                                                                                        mode.price
                                                                                    }
                                                                                    =₹
                                                                                    {indi.seats *
                                                                                        mode.price}
                                                                                </span>
                                                                            )}
                                                                        </span>
                                                                    </span>
                                                                </li>
                                                            )
                                                        )}
                                                    </ol>
                                                </div>
                                                <hr />
                                                <div className="row mb-2">
                                                    <div className="col-6 text-start">
                                                        {indi.createdAt}
                                                    </div>
                                                    <div className="col-6 text-end fw-bold fs-5">
                                                        Total: ₹{indi.total}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        ) : (
                            <h1>No tickets</h1>
                        )
                    ) : (
                        <div className="alert alert-info">
                            <h2>Loading...</h2>
                        </div>
                    )}
                </div>
            </div>
        </Base>
    );
};

export default Tickets;
