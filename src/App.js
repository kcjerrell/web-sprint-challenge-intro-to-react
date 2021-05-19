import React, { useEffect, useState } from 'react';
import './App.css';
import Characters from './components/Characters';
import styled from 'styled-components';

// Styled Columns element
const Columns = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
`;

// Styled next/prev page buttons
const PageButton = styled.button`
  margin: 5px;
  padding: 5px;
  font-size: large;
  background-color: #ccccccbb;
  border: 1px black solid;
  color: #111111;
  border-radius: 3px;

  &:hover {
    background-color: #dddddddd;
  }

  &:disabled {
    color: #555555;
    background-color: #ccccccaa;
  }
`;

// Creates an App component
const App = (props) => {
  const [pageOffset, setPageOffset] = useState(1);

  return (
    <div className="App">
      <div className="background" />
      <h1 className="Header">Characters</h1>

      <Columns>
        <Characters pageNumber={pageOffset}></Characters>
        <Characters pageNumber={pageOffset + 1}></Characters>
      </Columns>

      <div>
        <PageButton disabled={pageOffset === 1} onClick={() => setPageOffset(pageOffset - 2)}>Back</PageButton>
        <PageButton onClick={() => setPageOffset(pageOffset + 2)}>Next</PageButton>
      </div>

    </div>
  );
}

export default App;
