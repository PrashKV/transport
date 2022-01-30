import React, { useState, useEffect } from "react";
import Base from "../core/Base";

import { isAuthenticated} from "../auth/helper";
import { getOneUser, updateProfile } from "./helper/userapicall";
import { Link } from "react-router-dom";
import {signout} from "../auth/helper"
const UpdateUser = ({history}) => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        
        error: "",
        success: false,
    });
    const { user, token } = isAuthenticated();
    const { name, email, error, success } = values;

    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value, success:false });
    };

    const preload = () => {
        getOneUser(user._id, token).then((data) => {
           
            if (data.error) {
                setValues({...values, error:data.error})
            } else {
                setValues({
                    ...values,
                    name: data.name,                   
                    email:data.email
                })
            }
        });
    };
    useEffect(() => {
        preload();
    }, []);
    const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false });
        updateProfile(user._id, token,{ name, email })
            .then((data) => {
                
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false });
                } else {
                    setValues({
                        ...values,
                        
                        success: true,
                    });
                }
            })
            .catch(() => console.log("Error in user update"));
    };

    const successMessage = () => {
        return (
            <div
                className="alert alert-success"
                style={{ display: success ? "" : "none" }}
            >
                Update Successful! Please <Link className="link" style={{textDecoration:"none"}} onClick={() => {
                            signout(() => {
                                history.push("/signin");
                            });
                        }} to="/signin">Sign out</Link> and Sign in again for changes to appear
            </div>
        );
    };
    const errorMessage = () => {
        return (
            <div
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
            >
                {error}
            </div>
        );
    };

    const updateForm = () => {
        return (
            <div className="row justify-content-center">
                <form className="col-md-7 col-sm-9">
                    <div className="form-group">
                        <input
                            className="form-control boxx "
                            placeholder="Name"
                            onChange={handleChange("name")}
                            value={values.name}
                            type="text"
                        />
                    </div>
                    <div className="form-group my-3">
                        <input
                            className="form-control boxx "
                            placeholder="Email"
                            value={values.email}
                            onChange={handleChange("email")}
                            type="email"
                            required
                        />
                    </div>

                    <button
                        onClick={onSubmit}
                        className="btn btn-success btn-block my-3"
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    };

    return (
        <Base title="Update User" description="Edit User Info Here!">
            {successMessage()}
            {errorMessage()}
            {updateForm()}
        
        </Base>
    );
};

export default UpdateUser;
