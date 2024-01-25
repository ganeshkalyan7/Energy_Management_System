// src/components/ScheduleForm.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const SamplFile = () => {
  const [formData, setFormData] = useState({
    weekdays: [],
    startTime: '',
    endTime: '',
    charge: '',
    discharge: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleWeekdayChange = (event) => {
    const selectedWeekdays = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setFormData((prevData) => ({ ...prevData, weekdays: selectedWeekdays }));
  };

  const handleSelectAllWeekdays = () => {
    const allWeekdays = [
      'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
    ];
    setFormData((prevData) => ({ ...prevData, weekdays: allWeekdays }));
  };

  const handleClearAllWeekdays = () => {
    setFormData((prevData) => ({ ...prevData, weekdays: [] }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/schedule', formData);
      console.log('Schedule saved:', response.data);
      // Reset form data here if needed
    } catch (error) {
      console.error('Error saving schedule:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="weekdays">
        <Form.Label>Select Weekdays</Form.Label>
        <Form.Control
          as="select"
          name="weekdays"
          multiple
          onChange={handleWeekdayChange}
          value={formData.weekdays}
        >
          <option value="monday">Monday</option>
          <option value="tuesday">Tuesday</option>
          {/* ... other weekdays */}
        </Form.Control>
        <div className="mt-2">
          <Button variant="link" onClick={handleSelectAllWeekdays}>
            Select All
          </Button>
          <Button variant="link" onClick={handleClearAllWeekdays}>
            Clear All
          </Button>
        </div>
      </Form.Group>

      <Form.Group controlId="startTime">
        <Form.Label>Start Time</Form.Label>
        <Form.Control
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="endTime">
        <Form.Label>End Time</Form.Label>
        <Form.Control
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="charge">
        <Form.Label>Charge Setting</Form.Label>
        <Form.Control
          type="text"
          name="charge"
          value={formData.charge}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="discharge">
        <Form.Label>Discharge Setting</Form.Label>
        <Form.Control
          type="text"
          name="discharge"
          value={formData.discharge}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Save Schedule
      </Button>
    </Form>
  );
};

export default SamplFile;
