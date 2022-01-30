import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getBus, updateBus } from "./helper/adminapicall";

const UpdateBus = ({ match }) => {
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
                Bus Updated Successfully!
            </div>
        );
    };

    const preload = (busId) => {
        getBus(busId).then((data) => {
            
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    s_addr: data.source.address,
                    s_lat: parseFloat(
                        JSON.stringify(data.source.lat).split('"')[3]
                    ),
                    s_lng: parseFloat(
                        JSON.stringify(data.source.lng).split('"')[3]
                    ),
                    d_addr: data.destination.address,
                    d_lat: parseFloat(
                        JSON.stringify(data.destination.lat).split('"')[3]
                    ),
                    d_lng: parseFloat(
                        JSON.stringify(data.destination.lng).split('"')[3]
                    ),
                    price: data.price,
                    seats: data.seats,
                    formData: new FormData(),
                });
            }
        });
    };

    useEffect(() => {
        preload(match.params.busId);
    }, []);
    const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false });

        updateBus(match.params.busId, user._id, token, formData)
            .then((data) => {
                
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false });
                } else {
                    setValues({
                        ...values,
                        
                        
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
                    to="/admin/bus/manage"
                    className="btn btn-sm btn-warning mt-3"
                >
                    Manage Buses
                </Link>
            </div>
        );
    };
    const updateBusForm = () => (
        <form onSubmit={onSubmit}>
            <div className="form-group ">
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
                placeholder="Update Bus"
                className="btn btn-success mt-3"
            />
        </form>
    );

    return (
        <Base
            title="Update Bus"
            description="Update bus route here!"
            className="container bg-info p-3"
        >
            {errorMessage()}
            {successMessage()}
            <div className="row  text-white rounded">
                <div className="col-md-8 offset-md-2">{updateBusForm()}</div>
            </div>
            {goback()}
            
        </Base>
    );
};

export default UpdateBus;
