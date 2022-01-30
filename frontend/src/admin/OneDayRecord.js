import React, { useState, useEffect } from "react";

import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getOneRecord } from "./helper/adminapicall";
import _ from "lodash";

const OneDayRecord = ({ match }) => {
    const [record, setRecord] = useState([]);

    const { user, token } = isAuthenticated();

    const preload = (recordId) => {
        getOneRecord(recordId, user._id, token).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setRecord(data);
            }
        });
    };

    useEffect(() => {
        preload(match.params.recordId);
    }, []);

    return (
        <Base
            title="Welcome Admin!"
            description="View Record of Particular day"
            className=""
        >
            <Link className="btn btn-warning" to={`/records`}>
                <span className="">Record</span>
            </Link>
            <h2 className="my-4 ">{match.params.recordId.split("T")[0]}</h2>

            <div className="row justify-content-center">
                <div className="col-10">
                    <hr />
                    <div className="row text-center mb-2 ">
                        <div className="col-4">
                            <h4 className=" ">Name</h4>
                        </div>
                        <div className="col-4">
                            <h4 className=" ">Total Seats</h4>
                        </div>
                        <div className="col-4">
                            <h4 className=" ">Seats Booked</h4>
                        </div>
                    </div>
                    <hr />
                    {record.map((bus, index) => {
                        return (
                            <div key={index} className="row text-center mb-2 ">
                                <div className="col-4">
                                    <h4 className=" ">{bus.name}</h4>
                                </div>
                                <div className="col-4">
                                    <h4 className=" ">{bus.seats}</h4>
                                </div>
                                <div className="col-4">
                                    <h4 className=" ">{bus.booked}</h4>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Base>
    );
};

export default OneDayRecord;
