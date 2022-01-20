import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false,
    });

    const { name, email, password, error, success } = values;

    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password })
            .then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false });
                } else {
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true,
                    });
                }
            })
            .catch(() => console.log("Error in signup"));
    };

    const successMessage = () => {
        return (
            <div className="alert alert-success"
                style={{ display: success ? "" : "none" }}>
                New Account Created Successfully. Please <Link to="/signin">Login here</Link> 
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

    const signUpForm = () => {
        return (
            <div className="row justify-content-center" >
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

                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control boxx"
                            onChange={handleChange("password")}
                            placeholder="Password"
                            value={values.password}
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
        
        <Base title="SIGN UP" description="A page for user to sign up!">
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
            <p className=" text-center">{JSON.stringify(values)}</p>
            </Base>
          
    );
};

export default Signup;
