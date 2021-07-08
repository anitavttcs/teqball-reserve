import React, { useState, useEffect } from "react";
import { UserContext } from "../context";
import jwt_decode from "jwt-decode";

function UserContextProvider({ children }) {
  const [user, setUser] = useState();

  const refreshToken = async (oldToken) => {
    try {
      // TODO: refresh token and save decoded user
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      refreshToken(token);

      setUser(jwt_decode(token));
    }
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
