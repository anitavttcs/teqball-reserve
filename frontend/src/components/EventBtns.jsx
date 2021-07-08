import axios from "axios";
import { useState, useEffect } from "react";

export default function EventBtns({ user, event }) {
  const [participation, setParticipation] = useState(null);

  const getParticipation = async () => {
    if (event.participants.accepted.includes(user.id)) {
      setParticipation(true);
    }

    if (event.participants.rejected.includes(user.id)) {
      setParticipation(false);
    }
  };

  const sendParticipation = async (isParticipate) => {
    const jwt = localStorage.getItem("token");
    const url = `http://localhost:5000/api/event/${event._id}/participant`;

    axios({
      method: "put",
      url: url,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
      data: {
        participation: isParticipate,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setParticipation(isParticipate);
  };



  useEffect(() => {
    getParticipation();
  }, []);

  return (
    <div>
      <button id="eventAcceptBtn"
        className={
          participation ? "btn btn-success" : "btn btn-outline-success"
        }
        onClick={() => sendParticipation(true)}
        disabled={participation}
      >
        {participation ? "Accepted" : "Accept"}
      </button>
      <button id="eventRejectBtn"
        className={
          participation === false ? "btn btn-danger" : "btn btn-outline-danger"
        }
        onClick={() => sendParticipation(false)}
        disabled={(participation === false)}
      >
        {participation === false ? "Rejected" : "Reject"}
      </button>
    </div>
  );
}
