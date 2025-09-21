const EventCard = ({ title, date, location }) => {
  return (
    <div className="event-card">
      <h3>{title}</h3>
      <p className="event-location">{location}</p>
    </div>
  );
};

export default EventCard;