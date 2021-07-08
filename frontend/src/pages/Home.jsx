import { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";

function Home({ setUser, user }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    console.log(user);
    getEvents();
  }, []);

  useEffect(() => {
    console.log(events);
  }, [events]);

  const getEvents = async () => {
    const jwt = localStorage.getItem("token");

    if (jwt) {
      try {
        const response = await axios
          .get(`http://localhost:5000/api/event`, {
            headers: {
              "Content-type": "application/json",
              authorization: `Bearer ${jwt}`,
            },
          });
        setEvents(response.data);
      } catch (error) {
        localStorage.removeItem("token"); //hibánál token törl.
        setUser(null);
      }
    }
  };

  return (
    <>
      {user ?
        <>
          <h1>Events</h1>
          <div className="card w-50">
            <div className="card-body">
              {events?.map((event, index) => {
                return <EventCard event={event} key={index} user={user} />;
              })}
            </div>
          </div>
        </>
        :
        <>
          <h1>Welcome to Teqball Reserve</h1>
          <div className="pageContent">
            <p>Please sign in to continue</p>
          </div>
        </>
      }
    </>
  );
}

export default Home;
