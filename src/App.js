import React, { useState } from 'react';

import Search from './components/Search';
import Users from './components/Users';
import useFetch from './hook/useFetch';

const url = 'https://jsonplaceholder.typicode.com/users';

const App = () => {
  // Task 2: use custom hook
  // get data, error, isLoading states from custom hook here
  // use url: 'https://jsonplaceholder.typicode.com/users'
  const { data, isLoading, error } = useFetch(url);
  const [originalData, setOriginalData] = useState(data);
  const [filteredData, setFilteredData] = useState(data);

  // Task 3: delete user
  // get the id from User.js
  const handleDeleteUser = (id) => {
    const filter = data.originalData((item) => item.id != id);
    setOriginalData(filter);
    setFilteredData(filter);
  };

  // Task 4: search user
  // get the text from Search.js
  const handleSearch = (searchText) => {
    const filter = originalData.filter((item) =>
      item.name.toLowerCase().startsWith(searchText.toLowerCase())
    );
    setFilteredData(filter);
  };

  return (
    <div className="container">
      <h1 className="title">Users Management App</h1>
      {isLoading && <p>Loading users...</p>}
      {error && <p>{error}</p>}

      {/* Needs to pass functions from here for state lifting  */}
      <Search onHandleSearch={handleSearch} />
      {filteredData && <Users users={filteredData} onHandleDeleteUser={handleDeleteUser} />}
    </div>
  );
};

export default App;
