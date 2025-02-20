import React from 'react';
import styled from 'styled-components';
import Board from './components/Board';
import Header from './components/Header';

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f9fafc;
`;

function App() {
  return (
    <AppContainer>
      <Header />
      <Board />
    </AppContainer>
  );
}

export default App; 