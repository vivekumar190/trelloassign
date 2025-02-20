import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const AddListContainer = styled.div`
  background-color: ${props => props.isEditing ? '#ebecf0' : '#ffffff3d'};
  border-radius: 3px;
  width: 272px;
  padding: 8px;
  min-height: 32px;
  cursor: pointer;
`;

const AddListButton = styled.div`
  color: #ffffff;
  padding: 6px 8px;
  
  &:hover {
    background-color: #ffffff3d;
    border-radius: 3px;
  }
`;

const AddListForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Input = styled.input`
  padding: 8px;
  border: 2px solid #0079bf;
  border-radius: 3px;
  width: 100%;
  box-sizing: border-box;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const AddButton = styled.button`
  background-color: #0079bf;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #026aa7;
  }
`;

const CancelButton = styled.button`
  background: none;
  border: none;
  color: #6b778c;
  cursor: pointer;
  padding: 6px;
  
  &:hover {
    color: #172b4d;
  }
`;

const AddList = ({ setLists }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      const newList = {
        id: uuidv4(),
        title: title.trim(),
        cards: []
      };
      setLists(prev => [...prev, newList]);
      setTitle('');
      setIsEditing(false);
    }
  };

  if (!isEditing) {
    return (
      <AddListContainer onClick={() => setIsEditing(true)}>
        <AddListButton>+ Add another list</AddListButton>
      </AddListContainer>
    );
  }

  return (
    <AddListContainer isEditing={isEditing}>
      <AddListForm onSubmit={handleSubmit}>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter list title..."
          autoFocus
        />
        <ButtonGroup>
          <AddButton type="submit">Add List</AddButton>
          <CancelButton type="button" onClick={() => setIsEditing(false)}>
            ×
          </CancelButton>
        </ButtonGroup>
      </AddListForm>
    </AddListContainer>
  );
};

export default AddList; 