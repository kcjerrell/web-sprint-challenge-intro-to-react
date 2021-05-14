import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import Character from './components/Character';
import Characters from './components/Characters';
import { API_ENDPOINT } from "./constants";

const App = () => {
  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.

  // Fetch characters from the API in an effect hook. Remember, anytime you have a
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.
  const [characters, setCharacters] = useState([]);

  useEffect(() => {

    const fetchChars = async () => {
      try {
        const response = await axios.get(API_ENDPOINT);
        setCharacters(response.data);
      } catch (error) {
        console.log(error);
        return [];
      }
    }

    fetchChars();
  }, []);

  return (
    <div className="App">
      <Characters data={characters}></Characters>
    </div>
  );
}

export default App;
