import EventList from "./components/EventList";
import { mockEvents } from "./data/mockEvents";
import "./index.css";

const App = () => {
  return (
    <div className="app">
      <h1>Eventos UPB (DTI)</h1>
      <EventList events={mockEvents} />
    </div>
  );
};

export default App;