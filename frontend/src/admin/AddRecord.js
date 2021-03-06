import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createRecord } from "./helper/adminapicall";

const AddRecord = () => {
    const [date, setDate] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated();

    const goback = () => {
        return (
            <div className="mt-5">
                <Link
                    to="/admin/dashboard"
                    className="btn btn-sm btn-warning my-3"
                >
                    Admin dashboard
                </Link>
            </div>
        );
    };

    const handleChange = (event) => {
        
        setError("");
        setDate(event.target.value);
        setSuccess(false)
        // console.log(new Date.now().toISOString())
    };
    const min_date = () => {
        var dateobj = new Date(Date.now());
        dateobj.setHours(new Date().getHours() + 5)
        dateobj.setMinutes(new Date().getMinutes() + 30)
        
        
        return dateobj.toISOString().split("T")[0];
    };
    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        //backend request
        createRecord(user._id, token, { date }).then((data) => {
            console.log(data)
            if (!data) {
                setError("Error Creating record")
            }
            else if (data.error) {
                setError(data.error);
            } else {
                setError("");
                setSuccess(true);
                setDate("");
            }
        });
    };
    const successmessage = () => {
        return (
            <div className="alert alert-success"
                style={{ display: success ? "" : "none" }}>
                Record Creation Successfull
            </div>
        )
    }
    const errorMessage = () => {
        return (
            <div className="alert alert-danger"
                style={{ display: error ? "" : "none" }}>
                {error} 
            </div>
        )
    }
    const dateForm = () => {
        return (
            <form className="mx-5" onSubmit={onSubmit}>
                <div className="form-group">
                    <p className="lead">Enter record date</p>
                    <input
                        type="date"
                        id="userdate"
                        className="form-control my-3"
                        required
                        // autoFocus
                        onChange={handleChange}
                        value={date}
                        min={min_date()}
                    />

                    <input
                        type="submit"
                        className="btn btn-success mt-5"
                        value="Create Record"
                    />
                </div>
            </form>
        );
    };

    return (
        <Base
            title="Create New Record"
            description="Create new record to store information about booked seats in buses"
            className="container bg-info p-4 mt-5"
        >
                
                {errorMessage()}
                    {successmessage()}
            <div className="row">
                <div className="">
                    {" "}
                    {dateForm()}
                    {goback()}
                    
                    {error}
                    {success}
                    {date}
                </div>
            </div>
        </Base>
    );
};
export default AddRecord;
