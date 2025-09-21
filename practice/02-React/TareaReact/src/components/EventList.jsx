import EventCard from "./EventCard";

const EventList = ({ events }) => {
  return (
    <div className="event-list">
      {events.map((event) => (
        <EventCard
          title={event.title}
          location={event.location}
        />
      ))}
    </div>
  );
};

export default EventList;