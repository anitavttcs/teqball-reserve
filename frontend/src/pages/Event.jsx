import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Map from "../components/Map";

const Event = ({ setUser, user }) => {
  const { id } = useParams();
  const history = useHistory();

  const [event, setEvent] = useState({});

  useEffect(() => {
    getEvent();
  }, []);

  const getEvent = async () => {
    const jwt = localStorage.getItem("token");

    try {
      const response = await axios.get(`http://localhost:5000/api/event/${id}`, {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${jwt}`,
        },
      })
      console.log(response.data)
      setEvent(response.data);
    } catch (error) {
      localStorage.removeItem("token"); //hibánál token törl.
      setUser(null);

    }
  };

  return (
    <div className="eventPage">
      <div>
        <h1>{event.title}</h1>
        <div className="card w-50">
          <div className="card-body vertical">
            <div>
              <p className="card-text">Date: {event.date}</p>
              <p className="card-text">Location: {event.location}</p>
            </div>
            <p>Accepted:</p>
            <ul>
              {event?.participants?.accepted.map((ap, i) => {
                return <li className="card-text" key={i}>{ap?.name}</li>;
              })}
            </ul>

            <p>Rejected:</p>
            <ul>
              {event?.participants?.rejected.map((rp, i) => {
                return <li className="card-text" key={i}>{rp?.name}</li>;
              })}
            </ul>
            <button className="btn btn-outline-primary" onClick={() => history.push(`/`)}>Back</button>
          </div>
          <div className="card-footer text-muted">
            2 days ago
          </div>
        </div>
      </div>
      <Map center={{ lat: 20, lng: 20 }} />
    </div>
  );
};

export default Event;
