import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background-color: #f4f5f7;
  border-radius: 3px;
  padding: 20px;
  width: 100%;
  max-width: 768px;
  max-height: 90vh;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #6b778c;
  
  &:hover {
    color: #172b4d;
  }
`;

const Title = styled.input`
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 2px solid transparent;
  border-radius: 3px;
  background-color: transparent;

  &:focus {
    background-color: #fff;
    border-color: #0079bf;
  }
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 8px;
`;

const Description = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 8px;
  border: 2px solid transparent;
  border-radius: 3px;
  resize: vertical;

  &:focus {
    border-color: #0079bf;
  }
`;

const DateInput = styled.input`
  padding: 8px;
  border: 2px solid transparent;
  border-radius: 3px;

  &:focus {
    border-color: #0079bf;
  }
`;

const DeleteButton = styled.button`
  background-color: #eb5a46;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #cf513d;
  }
`;

const CardModal = ({ card, listId, lists, setLists, onClose }) => {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || '');
  const [dueDate, setDueDate] = useState(card.dueDate || '');

  const handleSave = () => {
    const updatedLists = lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          cards: list.cards.map(c => {
            if (c.id === card.id) {
              return {
                ...c,
                title,
                description,
                dueDate
              };
            }
            return c;
          })
        };
      }
      return list;
    });

    setLists(updatedLists);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      const updatedLists = lists.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            cards: list.cards.filter(c => c.id !== card.id)
          };
        }
        return list;
      });

      setLists(updatedLists);
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={handleSave}
        />
        <Section>
          <SectionTitle>Description</SectionTitle>
          <Description
            value={description}
            onChange={e => setDescription(e.target.value)}
            onBlur={handleSave}
            placeholder="Add a more detailed description..."
          />
        </Section>
        <Section>
          <SectionTitle>Due Date</SectionTitle>
          <DateInput
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            onBlur={handleSave}
          />
        </Section>
        <DeleteButton onClick={handleDelete}>Delete Card</DeleteButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CardModal; 