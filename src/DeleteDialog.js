import React from 'react';
import './style.css';

function EventDeleteDialog({ event, onDelete, openDialog, setOpenDialog }) {
  const confirmDeletion = () => {
    onDelete(event);
    setOpenDialog(false);
  };

  return (
    <>
      {openDialog && (
        <div className="dialog">
          <p>
            Möchten Sie das Event [<b>{event.title}</b>] wirklich löschen?
          </p>
          <div className="dialog-btn-wrap">
            <button id="delete-confirm" onClick={confirmDeletion}>
              Ja, löschen
            </button>
            <button id="delete-cancel" onClick={() => setOpenDialog(false)}>
              Abbrechen
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default EventDeleteDialog;
