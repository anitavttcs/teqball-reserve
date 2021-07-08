import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import Router from "./pages/Router";
import UserContextProvider from "./components/UserContextProvider";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

function App() {
  const [user, setUser] = useState("");

  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(jwtDecode(token)); //beállítja user state-et dekódolt tokennel
    }
    if (user)
      console.log(user);
  }

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <UserContextProvider>
      <Router setUser={setUser} user={user} checkToken={checkToken} />
    </UserContextProvider>
  );
}

export default App;
