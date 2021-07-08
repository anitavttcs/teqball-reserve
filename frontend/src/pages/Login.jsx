import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";

function Login({ checkToken }) {
  let history = useHistory();
  let location = useLocation();
  const [, setUser] = useContext(UserContext);

  // TODO: read query and post it to the backend then save jwt and decoded user

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    // console.log("1., google auth code: ", code);

    axios
      .post("http://localhost:5000/api/login", { code })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        history.push("/");
        checkToken();
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      Loading...
    </div>
  );
}

export default Login;
