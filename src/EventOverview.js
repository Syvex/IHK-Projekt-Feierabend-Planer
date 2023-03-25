import React, { useCallback, useState } from 'react';
import './style.css';
import * as mockData from './mockData.js';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import EventDeleteDialog from './DeleteDialog';
import { getUserName, getDateAndTime } from './helpers';

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
        <div key={event.eventId} className="event-outer">
          <div className="event-inner">
            <div className="event-date-time">
              <span>{getDateAndTime(event.dateTime)[0]}</span>
              <span>{getDateAndTime(event.dateTime)[1]}</span>
            </div>
            <div className="event-title">{event.title}</div>
            <div className="event-creator">
              Creator:
              <br />
              {getUserName(event.creatorId)}
            </div>
          </div>
          <div className="event-buttons">
            <FaEdit
              id="edit"
              size={30}
              data-tip="Bearbeiten"
              data-for="editTip"
              onClick={(e) => {
                e.preventDefault(),
                  setCurrentEventId(event.eventId),
                  setShowDetails(true);
              }}
            />

            <FaTrashAlt
              id="delete"
              size={30}
              data-tip="Löschen"
              data-for="deleteTip"
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
      <h2>Feierabend-Planer</h2>
      {renderEvents()}
      <div className="add-event-button" onClick={() => setShowDetails(true)}>
        Add Event
      </div>
    </div>
  );
}

export default EventList;
