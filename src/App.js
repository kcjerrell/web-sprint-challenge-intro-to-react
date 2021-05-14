import React, { useEffect, useState } from 'react';
import './App.css';
import Characters from './components/Characters';
import styled from 'styled-components';

const AppStyled = styled.div`

`;

const Columns = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
`;

const App = () => {
  console.log(`App called`);
  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.

  // Fetch characters from the API in an effect hook. Remember, anytime you have a
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.

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
        <button disabled>Back</button>
        <button onClick={() => setPageOffset(pageOffset + 2)}>Next</button>
      </div>
    </div>
  );
}

export default App;
