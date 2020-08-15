import React from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Formik } from "formik";
import axios from "axios";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const history = useHistory();

  const handleSubmit = (values) => {
    // preventDefault();
    console.log(values);
    axiosWithAuth()
      .post("/login", values)
      .then((res) => {
        console.log("Success", res);
        localStorage.setItem("authToken", res.data.payload);
        history.push("/bubble-page");
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("authToken");
      });
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <div>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values);
            resetForm();
          }}>
          {(props) => {
            const { values, handleSubmit, handleChange } = props;
            return (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="username"
                  value={values.username}
                  placeholder="username"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="password"
                  value={values.password}
                  placeholder="password"
                  onChange={handleChange}
                />
                <button type="submit">Submit</button>
              </form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default Login;
