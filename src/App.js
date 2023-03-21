import React, { useState } from 'react';
import './style.css';
import EventList from './EventOverview.js';
import EventDetails from './EventDetails.js';

export default function App() {
  const [showDetails, setShowDetails] = useState(false);
  const [currentEventId, setCurrentEventId] = useState();

  return (
    <div>
      {(showDetails && (
        <EventDetails
          eventId={currentEventId}
          setShowDetails={setShowDetails}
          setCurrentEventId={setCurrentEventId}
        />
      )) || (
        <EventList
          setCurrentEventId={setCurrentEventId}
          setShowDetails={setShowDetails}
        />
      )}
    </div>
  );
}
