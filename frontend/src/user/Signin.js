import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";

import { signin, authenticate, isAutheticated } from "../auth/helper"

const Signin = () => {


    const [values, setValues] = useState({
        email: "user@g.com",
        password: "12345",
        error: "",
        loading: false,
        didRedirect: false
    })

    const { email, password, error, loading, didRedirect } = values
    
    const { user } = isAutheticated()

    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const onSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: false, loading: true })
        signin({ email, password })
            .then((data) => {
                
                if (data.error) {
                    setValues({...values, error:data.error, loading:false})
                }
                else {
                    authenticate(data, () => {
                        setValues({...values, didRedirect:true})
                    })
                }
            })
        .catch((e)=>console.log(e))
    }

    const performRedirect = () => {
        if (didRedirect) {
            if (user && user.role === 1) {
                return (<p>Redirect to admin</p>)
            }
            else {
                return (<div><p>redirect to user dashboard</p>{JSON.stringify(user)}</div>)
            }
        }
        // if (isAutheticated()) {
        //     return <Redirect to="/"/>
        // }
    }
    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
        )
    )}
    const errorMessage = () => {
        return (
            <div className="alert alert-danger"
                style={{ display: error ? "" : "none" }}>
                {error} 
            </div>
        )
    }
    const signInForm = () => {
        return (
            <div className="row justify-content-center">
                <div className="col-md-7 col-sm-9">
                    <form>
                        <div className="form-group my-3">
                            <input
                                className="form-control boxx"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleChange("email")}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                className="form-control boxx"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={handleChange("password")}
                            />
                        </div>
                        <button className="btn btn-success btn-block my-3"
                        onClick={onSubmit}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <Base title="SIGN IN" description="A page for user to sign in!">
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
            <p className="text-center">{JSON.stringify(values)}</p>
        </Base>
    );
};

export default Signin;
