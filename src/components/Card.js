import React, { useState } from 'react';
import styled from 'styled-components';
import { Draggable } from '@hello-pangea/dnd';
import CardModal from './CardModal';

const CardContainer = styled.div`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 #091e4240;
  cursor: pointer;
  margin-bottom: 8px;
  min-height: 20px;
  padding: 6px 8px;
  position: relative;

  &:hover {
    background-color: #f4f5f7;
  }
`;

const CardTitle = styled.div`
  overflow-wrap: break-word;
  font-size: 14px;
`;

const DueDate = styled.div`
  font-size: 12px;
  color: ${props => props.isOverdue ? '#eb5a46' : '#5e6c84'};
  margin-top: 4px;
`;

const Card = ({ card, index, listId, lists, setLists }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString();
  };

  const isOverdue = (date) => {
    if (!date) return false;
    return new Date(date) < new Date();
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#eb5a46';
      case 'medium':
        return '#f2d600';
      case 'low':
        return '#61bd4f';
      default:
        return '#5e6c84';
    }
  };

  return (
    <>
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <CardContainer
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => setIsModalOpen(true)}
          >
            <CardTitle>{card.title}</CardTitle>
            {card.priority && (
              <div 
                className="card-priority"
                style={{ 
                  backgroundColor: getPriorityColor(card.priority),
                  color: 'white',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  fontSize: '12px',
                  display: 'inline-block',
                  marginTop: '4px'
                }}
              >
                {card.priority.charAt(0).toUpperCase() + card.priority.slice(1)}
              </div>
            )}
            {card.dueDate && (
              <DueDate isOverdue={isOverdue(card.dueDate)}>
                Due: {formatDate(card.dueDate)}
              </DueDate>
            )}
          </CardContainer>
        )}
      </Draggable>
      {isModalOpen && (
        <CardModal
          card={card}
          listId={listId}
          lists={lists}
          setLists={setLists}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default Card; 