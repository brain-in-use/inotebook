import React, { useState } from 'react';

export default function SearchForm() {
  const [searchQuery, setSearchQuery] = useState('');

  // Handle input change
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      alert('Please enter a search term.');
      return;
    }
    searchOnPage(searchQuery);
  };

  // Search and highlight text on the page
  const searchOnPage = (query) => {
    const bodyText = document.body.innerHTML;
    const searchRegex = new RegExp(query, 'gi');

    if (!searchRegex.test(bodyText)) {
      alert('No matches found on this page.');
      return;
    }

    // Scroll to the first match (using the browser's built-in find function)
    if (window.find) {
      window.find(query);
    } else {
      alert('Your browser does not support this feature.');
    }
  };

  return (
    <form className="d-flex" role="search" onSubmit={handleFormSubmit}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
}
