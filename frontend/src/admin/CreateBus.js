import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { createBus } from "./helper/adminapicall";

const CreateBus = () => {
    const [values, setValues] = useState({
        name: "",
        s_addr: "",
        s_lat: "",
        s_lng: "",
        d_addr: "",
        d_lat: "",
        d_lng: "",
        price: "",
        seats: "",
        success: false,
        error: "",
        formData: new FormData(),
    });

    const { user, token } = isAuthenticated();
    const {
        name,
        s_addr,
        s_lat,
        s_lng,
        d_addr,
        d_lat,
        d_lng,
        price,
        seats,
        error,
        success,
        formData,
    } = values;
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
    const successMessage = () => {
        return (
            <div
                className="alert alert-success"
                style={{ display: success ? "" : "none" }}
            >
                New Bus Created Successfully!
            </div>
        );
    };
    const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false });

        createBus(user._id, token, formData)
            .then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false });
                } else {
                    setValues({
                        ...values,
                        name: "",
                        s_addr: "",
                        s_lat: "",
                        s_lng: "",
                        d_addr: "",
                        d_lat: "",
                        d_lng: "",
                        price: "",
                        seats: "",
                        success: true,
                        error: "",
                    });
                }
            })
            .catch((e) => console.log(e));
    };

    const handleChange = (name) => (event) => {
        setValues({
            ...values,
            error: false,
            [name]: event.target.value,
            success: false,
        });
        formData.set(name, event.target.value);
    };

    const goback = () => {
        return (
            <div className="">
                <Link
                    to="/admin/dashboard"
                    className="btn btn-sm btn-warning mt-3"
                >
                    Admin dashboard
                </Link>
            </div>
        );
    };
    const createBusForm = () => (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input
                    onChange={handleChange("name")}
                    className="form-control"
                    placeholder="Name"
                    value={name}
                    required
                />
            </div>
            <div className="form-group mt-1">
                <input
                    onChange={handleChange("s_addr")}
                    className="form-control"
                    placeholder="Source Address"
                    value={s_addr}
                    required
                />
            </div>
            <div className="form-group mt-1">
                <div className="row px-2">
                    <input
                        onChange={handleChange("s_lat")}
                        className="col mx-1 form-control"
                        placeholder="Source latitude"
                        value={s_lat}
                        required
                        pattern="^-?\d*\.{0,1}\d+$"
                        title="Source latitude must be a number"
                    />
                    <input
                        onChange={handleChange("s_lng")}
                        className="col mx-1 form-control"
                        placeholder="Source longitude"
                        value={s_lng}
                        required
                        pattern="^-?\d*\.{0,1}\d+$"
                        title="Source longitude must be a number"
                    />
                </div>
            </div>
            <div className="form-group mt-1">
                <input
                    onChange={handleChange("d_addr")}
                    className="form-control"
                    placeholder="Destination Address"
                    value={d_addr}
                    required
                />
            </div>
            <div className="form-group mt-1">
                <div className="row px-2">
                    <input
                        onChange={handleChange("d_lat")}
                        className="col mx-1 form-control"
                        placeholder="Destination latitude"
                        value={d_lat}
                        required
                        pattern="^-?\d*\.{0,1}\d+$"
                        title="Destination latitude must be a number"
                    />
                    <input
                        onChange={handleChange("d_lng")}
                        className="col mx-1 form-control"
                        placeholder="Destination longitude"
                        value={d_lng}
                        required
                        pattern="^-?\d*\.{0,1}\d+$"
                        title="Destination longitude must be a number"
                    />
                </div>
            </div>

            <div className="form-group mt-1">
                <input
                    onChange={handleChange("price")}
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    value={price}
                    required
                />
            </div>

            <div className="form-group mt-1">
                <input
                    onChange={handleChange("seats")}
                    type="number"
                    className="form-control"
                    placeholder="Seats"
                    value={seats}
                    required
                />
            </div>

            <input
                type="submit"
                placeholder="Create Bus"
                className="btn btn-success mt-3"
            />
        </form>
    );

    return (
        <Base
            title="Create Bus"
            description="Welcome to bus route creation section"
            className="container bg-info p-3"
        >
            {errorMessage()}
            {successMessage()}
            <div className="row  text-white rounded">
                <div className="col-md-8 offset-md-2">{createBusForm()}</div>
            </div>
            {goback()}
        </Base>
    );
};

export default CreateBus;
