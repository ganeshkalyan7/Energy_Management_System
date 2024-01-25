import React, { useState } from 'react';
import Select from 'react-select';


function Demo() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([
    { value: 'Place 1', label: 'Place 1' },
    { value: 'Place 2', label: 'Place 2' },
    { value: 'Place 3', label: 'Place 3' },
    // Add more places as needed
  ]);

  const handleInputChange = (inputValue) => {
    // Fetch suggestions based on inputValue from your data source
    // For now, just filter the options array
    const filteredOptions = options.filter(option =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    return filteredOptions;
  };

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  return (
    <div>
   <Select
      value={selectedOption}
      onChange={handleChange}
      options={options}
      onInputChange={handleInputChange}
      isSearchable
      placeholder="Search for a place"
    />
      
    </div>
  )
}

export default Demo







