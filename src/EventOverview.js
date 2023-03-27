import React, { useCallback, useState } from 'react';
import './style.css';
import { mockEvents } from './mockData.js';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import EventDeleteDialog from './DeleteDialog';
import { getUserName, getDateAndTime } from './helpers';

function EventList({ setCurrentEventId, setShowDetails }) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const handleDeleteEvent = () => {
    const index = mockEvents.findIndex(
      (event) => event.eventId === eventToDelete.eventId
    );
    if (index !== -1) {
      mockEvents.splice(index, 1);
    }

    setEventToDelete(null);
    setOpenDeleteDialog(false);
  };

  const renderEvents = useCallback(() => {
    return mockEvents.map((event) => {
      return (
        <div key={event.eventId} className="event-outer">
          <div className="event-inner">
            <div className="event-date-time">
              <span>{getDateAndTime(event.dateTime)[0]}</span>
              <span>{getDateAndTime(event.dateTime)[1]}</span>
            </div>
            <div className="event-title">{event.title}</div>
            <div className="event-creator">
              Ersteller:
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
    mockEvents,
    setCurrentEventId,
    setShowDetails,
    eventToDelete,
    openDeleteDialog,
  ]);

  return (
    <>
      <h2>Feierabend-Planer</h2>
      {renderEvents()}
      <button className="add-event-button" onClick={() => setShowDetails(true)}>
        Neues Event
      </button>
    </>
  );
}

export default EventList;
