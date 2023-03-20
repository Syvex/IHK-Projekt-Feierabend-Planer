import React from 'react';
import './style.css';

export default function App() {
  console.log();

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <label for="meeting-time">Choose a time for your appointment:</label>

      <input
        onChange={(e) => (e.preventDefault(), console.log(e.target.value))}
        type="datetime-local"
        id="meeting-time"
        name="meeting-time"
        value="2018-06-12T19:30"
        min="2018-06-07T00:00"
        max="2018-06-14T00:00"
      />
    </div>
  );
}
