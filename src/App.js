import React, { useCallback } from 'react';
import './style.css';
import * as mockData from './mockData.js';

function EventList() {
  const { mockEvents, mockAttendees } = mockData;

  const handleDeleteEvent = (eventToDelete) => {
    // Find the index of the event to delete in the mockEvents array
    const eventIndex = mockEvents.findIndex(
      (event) => event.eventId === eventToDelete.eventId
    );
    if (eventIndex === -1) {
      console.error(`Event ${eventToDelete.eventId} not found in mockEvents`);
      return;
    }

    // Remove the event from the mockEvents array
    const deletedEvents = mockEvents.splice(eventIndex, 1);

    // Remove the attendees for the deleted event from the mockAttendees array
    const deletedAttendees = mockAttendees.filter(
      (attendee) => attendee.eventId === eventToDelete.eventId
    );
    deletedAttendees.forEach((attendee) => {
      const attendeeIndex = mockAttendees.findIndex(
        (a) => a.attendeeId === attendee.attendeeId
      );
      if (attendeeIndex !== -1) {
        mockAttendees.splice(attendeeIndex, 1);
      }
    });

    console.log(
      `Deleted event ${deletedEvents[0].eventId} and ${deletedAttendees.length} attendees.`
    );
  };

  const renderEvents = useCallback(() => {
    return mockEvents.map((event) => {
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
  }, [mockEvents]);

  return (
    <div className="event-list">
      {renderEvents()}
      <div className="add-event-button">Add Event</div>
    </div>
  );
}

export default EventList;
