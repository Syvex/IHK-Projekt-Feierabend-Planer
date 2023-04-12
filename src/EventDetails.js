import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import Select from 'react-select';
import { mockEvents, mockUsers } from './mockData';
import { getUserName } from './helpers';
import './DetailStyles.css';

function EventDetails({ eventId, setShowDetails, setCurrentEventId }) {
  // Set up state to hold the form data.
  const [formData, setFormData] = useState({
    title: '',
    dateTime: new Date(),
    description: '',
    attendees: [],
  });

  // Set up state to hold any error messages.
  const [errorMessage, setErrorMessage] = useState('');

  // When the component mounts, load the event data if an eventId is provided.
  React.useEffect(() => {
    if (eventId) {
      // Find the event with the given eventId.
      const event = mockEvents.find((e) => e.eventId === eventId);
      if (!event) {
        setErrorMessage(`Event with ID ${eventId} not found.`);
        return;
      }

      // Set the form data to the event data.
      setFormData({
        title: event.title,
        dateTime: new Date(event.dateTime),
        description: event.description || '',
        attendees: event.attendees.map((attendeeId) => {
          const attendee = mockUsers.find((user) => user.userId === attendeeId);
          return attendee || null;
        }),
      });
    }
  }, [eventId]);

  // Handle changes to the form data.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  // Handle changes to the date and time.
  const handleDateTimeChange = (dateTime) => {
    setFormData((prevFormData) => ({ ...prevFormData, dateTime }));
  };

  // Handle changes to the attendee selection.
  const handleAttendeesChange = (selectedOptions) => {
    const selectedAttendees = selectedOptions.map((option) =>
      mockUsers.find((user) => user.userId === Number(option.value))
    );
    setFormData((prevFormData) => ({
      ...prevFormData,
      attendees: selectedAttendees,
    }));
  };

  const handleCancel = () => {
    setShowDetails(false);
    setCurrentEventId(null);
  };

  // Handle form submission.
  const handleSubmit = (event) => {
    event.preventDefault();
    // Check that required fields are filled out.
    if (
      !formData.title ||
      !formData.dateTime ||
      formData.attendees.length === 0
    ) {
      setErrorMessage(
        'Bitte füllen Sie alle Notwendigen Felder aus. Nur Beschreibungen sind Optional.'
      );
      return;
    }

    // Create a new event object with the form data.
    const newEvent = {
      // If there are other events, take the last and increment it's ID by 1
      eventId: mockEvents[mockEvents.length - 1]?.eventId + 1 || 1,
      creatorId: 1, // needs to be made dynamic once a real backend and login exists
      title: formData.title,
      dateTime: formData.dateTime.toISOString(),
      description: formData.description || null,
      attendees: formData.attendees.map((attendee) => attendee.userId),
    };

    // If an eventId was provided, update the corresponding event in mockEvents.
    if (eventId) {
      const eventIndex = mockEvents.findIndex((e) => e.eventId === eventId);
      if (eventIndex === -1) {
        setErrorMessage(`Event with ID ${eventId} not found.`);
        return;
      }
      mockEvents[eventIndex] = newEvent;
    } else {
      // Otherwise, add the new event to the end of the mockEvents array.
      mockEvents.push(newEvent);
    }

    // Reset the form data and show a success message.
    setFormData({
      title: '',
      dateTime: new Date(),
      description: '',
      attendees: [],
    });
    setErrorMessage('');
    alert(`Event ${eventId ? 'updated' : 'created'} successfully!`);
    setShowDetails(false);
    setCurrentEventId(null);
  };

  return (
    <>
      <h2>Event Details</h2>
      <div className="add-event-container">
        <form className="event-form" onSubmit={handleSubmit}>
          <div className="details-container">
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Event Titel"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <hr />
            <DateTimePicker
              onChange={handleDateTimeChange}
              value={formData.dateTime}
              showTimeSelect={true}
            />
            <hr />
            <br />
            <label htmlFor="description">Beschreibung:</label>
            <br />
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              value={formData.description}
              rows="12"
              cols="50"
            />
          </div>
          <div className="side-bar">
            <label>Teilnehmer</label>
            <div className="attendees-container">
              <Select
                className="attendee-select"
                isMulti
                name="attendees"
                options={mockUsers
                  .filter(
                    (user) =>
                      !formData.attendees.find(
                        (attendee) => attendee.userId === user.userId
                      )
                  )
                  .map((user) => ({
                    value: user.userId,
                    label: getUserName(user.userId),
                  }))}
                value={formData.attendees.map((attendee) => ({
                  value: attendee.userId,
                  label: getUserName(attendee.userId),
                }))}
                onChange={handleAttendeesChange}
                placeholder={'+ Hinzufugen'}
              />
            </div>
            <div className="button-wrap">
              <button className="submit-btn" type="submit">
                {eventId ? 'Update Event' : 'Event erstellen'}
              </button>
              <button
                className="cancel-btn"
                onClick={() => handleCancel()}
                type="button"
              >
                Abbrechen
              </button>
            </div>
          </div>
          <span className="error-msg">
            {errorMessage && <p>{errorMessage}</p>}
          </span>
        </form>
      </div>
    </>
  );
}

export default EventDetails;
