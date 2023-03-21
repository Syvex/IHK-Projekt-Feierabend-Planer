import React, { useCallback, useState } from 'react';
import './style.css';
import * as mockData from './mockData.js';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import EventDeleteDialog from './DeleteDialog';

function EventList() {
  const { mockUsers } = mockData;
  const [events, setEvents] = useState(mockData.mockEvents);
  const [attendees, setAttendees] = useState(mockData.mockAttendees);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  function getUserName(userId) {
    const user = mockUsers.find((u) => u.userId === userId);
    if (user) {
      return `${user.firstName} ${user.lastName}`;
    } else {
      console.error(`User with userId ${userId} not found in mockUsers`);
      return '';
    }
  }

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
            Created by: {getUserName(event.creatorId)}
          </div>
          <div className="event-buttons">
            <FaEdit size={24} />
            <FaTrashAlt size={24} onClick={() => setOpenDeleteDialog(true)} />
          </div>
          <EventDeleteDialog
            event={event}
            onDelete={handleDeleteEvent}
            openDialog={openDeleteDialog}
            setOpenDialog={setOpenDeleteDialog}
          />
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
