import React, { useState } from 'react';
import '../styles/CardModal.css';

const CardModal = ({ card, listId, lists, setLists, onClose }) => {
  const [formData, setFormData] = useState({
    title: card.title || '',
    description: card.description || '',
    priority: card.priority || 'medium'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'priority') {
      handleSave({ ...formData, [name]: value });
    }
  };

  const handleSave = (data = formData) => {
    if (data.title.trim()) {
      const updatedLists = lists.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            cards: list.cards.map(c => {
              if (c.id === card.id) {
                return {
                  ...c,
                  title: data.title.trim(),
                  description: data.description.trim(),
                  priority: data.priority
                };
              }
              return c;
            })
          };
        }
        return list;
      });

      setLists(updatedLists);
    }
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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="form-field">
          <label className="field-label" htmlFor="modal-title">
            Card Title
          </label>
          <input
            id="modal-title"
            name="title"
            className="modal-title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            onBlur={() => handleSave()}
          />
        </div>

        <div className="section">
          <label className="field-label" htmlFor="modal-description">
            Description
          </label>
          <textarea
            id="modal-description"
            name="description"
            className="description"
            value={formData.description}
            onChange={handleChange}
            onBlur={() => handleSave()}
            placeholder="Add a more detailed description..."
          />
        </div>

        <div className="section">
          <label className="field-label" htmlFor="modal-priority">
            Priority
          </label>
          <select
            id="modal-priority"
            name="priority"
            className="priority-select"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button className="delete-button" onClick={handleDelete}>
          Delete Card
        </button>
      </div>
    </div>
  );
};

export default CardModal; 