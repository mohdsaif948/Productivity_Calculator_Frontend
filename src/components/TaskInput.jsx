import React, { useState } from 'react';

const TaskInput = ({ onAdd, loading }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd({ title: title.trim(), category: category.trim() });
    setTitle('');
    setCategory('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="input-section">
      <input
        type="text"
        className="task-input"
        placeholder="✨ What needs to be accomplished today?"
        value={title}
        onChange={e => setTitle(e.target.value)}
        maxLength={100}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />
      <input
        type="text"
        className="category-input"
        placeholder="🏷️ Category"
        value={category}
        onChange={e => setCategory(e.target.value)}
        maxLength={20}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />
      <button className="add-btn" onClick={handleAdd} disabled={!title.trim() || loading}>
        <span id="btnText">{loading ? 'Adding...' : 'Add Task'}</span>
      </button>
    </div>
  );
};

export default TaskInput; 