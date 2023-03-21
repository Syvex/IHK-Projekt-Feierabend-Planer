import React, { useCallback, useState } from 'react';
import './style.css';
import * as mockData from './mockData.js';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import EventDeleteDialog from './DeleteDialog';
import { getUserName } from './helpers';

function EventList({ setCurrentEventId, setShowDetails }) {
  const [events, setEvents] = useState(mockData.mockEvents);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const handleDeleteEvent = useCallback(() => {
    setEvents((prevEvents) => {
      const index = prevEvents.findIndex(
        (event) => event.eventId === eventToDelete.eventId
      );
      if (index !== -1) {
        const updatedEvents = [...prevEvents];
        updatedEvents.splice(index, 1);
        return updatedEvents;
      }
      return prevEvents;
    });
    setEventToDelete(null);
    setOpenDeleteDialog(false);
  }, [eventToDelete]);

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
            <FaEdit
              size={24}
              onClick={(e) => {
                e.preventDefault(),
                  setCurrentEventId(event.eventId),
                  setShowDetails(true);
              }}
            />
            <FaTrashAlt
              size={24}
              onClick={() => {
                setEventToDelete(event);
                setOpenDeleteDialog(true);
              }}
            />
          </div>
          <EventDeleteDialog
            event={eventToDelete}
            onDelete={handleDeleteEvent}
            openDialog={openDeleteDialog}
            setOpenDialog={setOpenDeleteDialog}
          />
        </div>
      );
    });
  }, [
    events,
    setCurrentEventId,
    setShowDetails,
    eventToDelete,
    openDeleteDialog,
  ]);

  return (
    <div className="event-list">
      {renderEvents()}
      <div className="add-event-button" onClick={() => setShowDetails(true)}>
        Add Event
      </div>
    </div>
  );
}

export default EventList;
