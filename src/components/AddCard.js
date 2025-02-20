import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../styles/AddCard.css';

const AddCard = ({ listId, lists, setLists }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium'
  });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsEditing(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      const newCard = {
        id: uuidv4(),
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
        dueDate: null
      };

      const updatedLists = lists.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            cards: [...list.cards, newCard]
          };
        }
        return list;
      });

      setLists(updatedLists);
      setFormData({
        title: '',
        description: '',
        priority: 'medium'
      });
      setIsEditing(false);
    }
  };

  if (!isEditing) {
    return (
      <div className="add-card-container">
        <button className="add-card-button" onClick={() => setIsEditing(true)}>
          + Add a card
        </button>
      </div>
    );
  }

  return (
    <div className="add-card-container" ref={containerRef}>
      <div className="popup-container">
        <form className="add-card-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="field-label" htmlFor="title">
              Card Title
            </label>
            <input
              id="title"
              name="title"
              className="title-input"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter card title..."
              autoFocus
              required
            />
          </div>

          <div className="form-field">
            <label className="field-label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="description-textarea"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add a more detailed description..."
            />
          </div>

          <div className="form-field">
            <label className="field-label" htmlFor="priority">
              Priority
            </label>
            <select
              id="priority"
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

          <div className="button-group">
            <button type="submit" className="add-button">
              Add Card
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => setIsEditing(false)}
            >
              ×
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCard; 