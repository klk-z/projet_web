import React, { useState } from 'react';
import axios from 'axios';


const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleQuery = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div>
      <input 
        type="text"
        placeholder="Search for messages..."
        value={searchQuery}
        onChange={handleQuery}
      />
      <button 
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;


/*const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedMessages, setSearchedMessages] = useState([]);

  const handleQuery = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {   
    try {
      const response = await axios.get(`/api/messages?query=${searchQuery}`);
      setSearchedMessages([response.data]);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  return (
    <div>
      <input 
        type="text"
        placeholder="Search for messages..."
        value={searchQuery}
        onChange={handleQuery}
      />
      <button 
        onClick={handleSearch}
      >
        Search
      </button>
      <br />
      <ul>
        {searchedMessages.map((message, index) => (
          <li key={index}>{message.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;*/
