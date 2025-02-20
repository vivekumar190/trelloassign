import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #026aa7;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.h1`
  color: white;
  margin: 0;
  font-size: 1.5rem;
`;

const ResetButton = styled.button`
  background-color: #ffffff;
  border: none;
  border-radius: 3px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Header = () => {
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the board? All data will be lost.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <HeaderContainer>
      <Logo>Trello Clone</Logo>
      <ResetButton onClick={handleReset}>Reset Board</ResetButton>
    </HeaderContainer>
  );
};

export default Header; 