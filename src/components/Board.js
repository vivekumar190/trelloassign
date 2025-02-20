import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import List from './List';
import AddList from './AddList';
import { v4 as uuidv4 } from 'uuid';

const BoardContainer = styled.div`
  flex-grow: 1;
  padding: 1rem;
  overflow-x: auto;
  background-color: #0079bf;
`;

const ListsContainer = styled.div`
  display: inline-flex;
  gap: 1rem;
  padding-bottom: 1rem;
  height: calc(100% - 2rem);
`;

const defaultLists = [
  {
    id: uuidv4(),
    title: 'To-Do',
    cards: []
  },
  {
    id: uuidv4(),
    title: 'In Progress',
    cards: []
  },
  {
    id: uuidv4(),
    title: 'Review',
    cards: []
  },
  {
    id: uuidv4(),
    title: 'Done',
    cards: []
  }
];

const Board = () => {
  const [lists, setLists] = useState(() => {
    const savedLists = localStorage.getItem('lists');
    return savedLists ? JSON.parse(savedLists) : defaultLists;
  });

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists]);

  const handleDragEnd = (result) => {
    const { destination, source, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'LIST') {
      const newLists = Array.from(lists);
      const [removed] = newLists.splice(source.index, 1);
      newLists.splice(destination.index, 0, removed);
      setLists(newLists);
      return;
    }

    // Handle card drag between lists
    const sourceList = lists.find(list => list.id === source.droppableId);
    const draggingCard = sourceList.cards[source.index];

    const newLists = lists.map(list => {
      // Remove from source list
      if (list.id === source.droppableId) {
        const newCards = Array.from(list.cards);
        newCards.splice(source.index, 1);
        return { ...list, cards: newCards };
      }
      // Add to destination list
      if (list.id === destination.droppableId) {
        const newCards = Array.from(list.cards);
        newCards.splice(destination.index, 0, draggingCard);
        return { ...list, cards: newCards };
      }
      return list;
    });

    setLists(newLists);
  };

  return (
    <BoardContainer>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="board" type="LIST" direction="horizontal">
          {(provided) => (
            <ListsContainer
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {lists.map((list, index) => (
                <List
                  key={list.id}
                  list={list}
                  index={index}
                  setLists={setLists}
                  lists={lists}
                />
              ))}
              {provided.placeholder}
              <AddList setLists={setLists} />
            </ListsContainer>
          )}
        </Droppable>
      </DragDropContext>
    </BoardContainer>
  );
};

export default Board; 