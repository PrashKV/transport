import React, { useState, useEffect } from "react";

import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getEveryRecordID } from "./helper/adminapicall";

const ViewRecord = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user, token } = isAuthenticated();
    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        );
    };
    const preload = () => {
        setLoading(true);
        getEveryRecordID(user._id, token).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setRecords(data);
            }
            setLoading(false);
        });
    };

    useEffect(() => {
        preload();
    }, []);

    return (
        <Base
            title="Welcome admin"
            description="View Records here"
            className=""
        >
            <Link className="btn btn-warning" to={`/admin/dashboard`}>
                <span className="">Admin Dashboard</span>
            </Link>
            <h2 className="my-4 ">Records:</h2>
            <hr/>
            {loadingMessage()}
            <div className="row justify-content-center">
                <ol className="col-4 offset-1  justify-content-center">
                    {records.map((record, index) => {
                        return (
                            <li key={index} >
                                <div className="row mb-2 ">
                                <div className="col-7 text-start pl-3">
                                    <h4 className="">{record._id.split('T')[0]}</h4>
                                </div>

                                <div className=" col-2">
                                    <Link
                                        className="btn btn-info "
                                        to={`/admin/record/${record._id}`}
                                    >
                                        <span className="">View</span>
                                        </Link>
                                        </div>
                                </div>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </Base>
    );
};

export default ViewRecord;
