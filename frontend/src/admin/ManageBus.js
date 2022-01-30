import React, { useState, useEffect } from "react";

import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getAllBus, deleteBus } from "./helper/adminapicall";

const ManageBus = () => {
    const [buses, setBuses] = useState([]);

    const { user, token } = isAuthenticated();

    const preload = () => {
        getAllBus().then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setBuses(data);
            }
        });
    };

    useEffect(() => {
        preload();
    }, []);

    const deleteThisBus = (busId, busName) => {
        let text = `You are about to delete "${busName}", proceed?`;
        if (window.confirm(text) === true) {
            deleteBus(busId, user._id, token).then((data) => {
                
                if (data.error) {
                    console.log(data.error);
                } else {
                    preload();
                }
            });
        }
    };

    return (
        <Base
            title="Welcome admin"
            description="Manage buses here"
            className=""
        >
            
            <Link className="btn btn-warning" to={`/admin/dashboard`}>
                <span className="">Admin Dashboard</span>
            </Link>
            <h2 className="my-4 ">All buses:</h2><hr/>
            <div className="row">
                <div className="col-12">
                    

                    {buses.map((bus, index) => {
                        console.log()
                        return (
                            <div key={index} className="row text-center mb-2 ">
                                <div className="col-4">
                                    <h4 className=" ">
                                        {bus.name}
                                    </h4>
                                </div>
                                <div className="col-4 text-capitalize fs-5">
                                        {bus.source.address} → {bus.destination.address}
                                </div>
                                <div className="col-2">
                                    <Link
                                        className="btn btn-success"
                                        to={`/admin/bus/update/${bus._id}`}
                                    >
                                        <span className="">Update</span>
                                    </Link>
                                </div>
                                <div className="col-2">
                                    <button
                                        onClick={() => {
                                            deleteThisBus(bus._id, bus.name);
                                        }}
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </button>
                                </div>
                                
                            </div>
                        );
                    })}
                    
                </div>
            </div>
        </Base>
    );
};

export default ManageBus;
