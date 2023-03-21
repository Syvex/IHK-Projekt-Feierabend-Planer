import React, { useCallback, useState } from 'react';
import './style.css';
import * as mockData from './mockData.js';

function EventList() {
  const [events, setEvents] = useState(mockData.mockEvents);
  const [attendees, setAttendees] = useState(mockData.mockAttendees);

  const handleDeleteEvent = useCallback(
    (eventToDelete) => {
      // Find the index of the event to delete in the events array
      const eventIndex = events.findIndex(
        (event) => event.eventId === eventToDelete.eventId
      );
      if (eventIndex === -1) {
        console.error(`Event ${eventToDelete.eventId} not found in events`);
        return;
      }

      // Remove the event from the events array
      const deletedEvent = events[eventIndex];
      const updatedEvents = [...events];
      updatedEvents.splice(eventIndex, 1);
      setEvents(updatedEvents);

      // Remove the attendees for the deleted event from the attendees array
      const deletedAttendees = attendees.filter(
        (attendee) => attendee.eventId === eventToDelete.eventId
      );
      deletedAttendees.forEach((attendee) => {
        const attendeeIndex = attendees.findIndex(
          (a) => a.attendeeId === attendee.attendeeId
        );
        if (attendeeIndex !== -1) {
          const updatedAttendees = [...attendees];
          updatedAttendees.splice(attendeeIndex, 1);
          setAttendees(updatedAttendees);
        }
      });

      console.log(
        `Deleted event ${deletedEvent.eventId} and ${deletedAttendees.length} attendees.`,
        updatedEvents
      );
    },
    [events, attendees]
  );

  const renderEvents = useCallback(() => {
    return events.map((event) => {
      return (
        <div key={event.eventId} className="event">
          <div className="event-time">
            {new Date(event.dateTime).toLocaleString()}
          </div>
          <div className="event-title">{event.title}</div>
          <div className="event-creator">
            Created by: User {event.creatorId}
          </div>
          <div className="event-buttons">
            <div className="event-button edit-button">Bearbeiten</div>
            <div
              className="event-button delete-button"
              onClick={() => handleDeleteEvent(event)}
            >
              Löschen
            </div>
          </div>
        </div>
      );
    });
  });

  return (
    <div className="event-list">
      {renderEvents()}
      <div className="add-event-button">Add Event</div>
    </div>
  );
}

export default EventList;
