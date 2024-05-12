import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchResultPage = ({ query }) => {
  const [searchedMessages, setSearchedMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/search/messages?query=${query}`);
        setSearchedMessages([response.data]);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [query]);

  return (
    <div>
      <h2>Search Results for "{query}"</h2>
      <ul>
        {searchedMessages.map((message, index) => (
          <li key={index}>{message.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResultPage;
