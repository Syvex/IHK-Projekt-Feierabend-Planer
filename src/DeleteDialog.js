import React from 'react';
import './style.css';

function EventDeleteDialog({ event, onDelete, openDialog, setOpenDialog }) {
  const confirmDeletion = () => {
    onDelete(event);
    setOpenDialog(false);
  };

  console.log('open');
  return (
    <>
      {openDialog && (
        <div className="dialog">
          <p>Do you really want to delete this event?</p>
          <button onClick={confirmDeletion}>Yes, delete</button>
          <button onClick={() => setOpenDialog(false)}>Cancel</button>
        </div>
      )}
    </>
  );
}

export default EventDeleteDialog;
