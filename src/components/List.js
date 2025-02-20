import React from 'react';
import styled from 'styled-components';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import Card from './Card';
import AddCard from './AddCard';

const ListContainer = styled.div`
  background-color: #ebecf0;
  border-radius: 3px;
  width: 272px;
  padding: 8px;
  height: fit-content;
  max-height: calc(100% - 16px);
  display: flex;
  flex-direction: column;
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 8px;
`;

const ListTitle = styled.h2`
  font-size: 14px;
  font-weight: bold;
  margin: 0;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #6b778c;
  padding: 4px;
  border-radius: 3px;

  &:hover {
    background-color: #dadbe2;
  }
`;

const CardsContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  min-height: 1px;
`;

const List = ({ list, index, lists, setLists }) => {
  const handleDeleteList = () => {
    if (window.confirm('Are you sure you want to delete this list?')) {
      const newLists = lists.filter((l) => l.id !== list.id);
      setLists(newLists);
    }
  };

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <ListContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ListHeader>
            <ListTitle>{list.title}</ListTitle>
            <DeleteButton onClick={handleDeleteList}>×</DeleteButton>
          </ListHeader>
          <Droppable droppableId={list.id} type="CARD">
            {(provided) => (
              <CardsContainer
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {list.cards.map((card, cardIndex) => (
                  <Card
                    key={card.id}
                    card={card}
                    index={cardIndex}
                    listId={list.id}
                    lists={lists}
                    setLists={setLists}
                  />
                ))}
                {provided.placeholder}
              </CardsContainer>
            )}
          </Droppable>
          <AddCard listId={list.id} lists={lists} setLists={setLists} />
        </ListContainer>
      )}
    </Draggable>
  );
};

export default List; 