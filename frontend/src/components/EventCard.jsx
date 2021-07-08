import { useHistory } from "react-router-dom";
import EventBtns from "./EventBtns";

const EventCard = ({ event, user }) => {
    const history = useHistory();

    return (
        <div className="card w-100">
            <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <span className="card-text">{event.date}</span>
                <span className="card-text">{event.time},</span>
                <span className="card-text">{event.location}</span>
                <button className="btn btn-outline-primary" onClick={() => history.push(`/event/${event._id}`)}>Details</button>
                <EventBtns event={event} user={user} />
            </div>
        </div>
    )
}

export default EventCard;
