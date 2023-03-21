import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import Select from 'react-select';
import { mockEvents, mockUsers } from './mockData';
import { getUserName } from './helpers';

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
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    // Create a new event object with the form data.
    const newEvent = {
      eventId: mockEvents.length + 1,
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
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Date and Time:
        <DateTimePicker
          onChange={handleDateTimeChange}
          value={formData.dateTime}
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Attendees:
        <Select
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
        />
      </label>
      <br />
      <button type="submit">{eventId ? 'Update' : 'Create'} Event</button>
      <button type="button" onClick={() => handleCancel()}>
        Cancel
      </button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}

export default EventDetails;
