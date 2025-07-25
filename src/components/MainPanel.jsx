import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskInput from './TaskInput';
import StatsGrid from './StatsGrid';
import FilterTabs from './FilterTabs';
import TasksContainer from './TasksContainer';
import Insights from './Insights';
import Analytics from './Analytics';

const API_URL = process.env.REACT_APP_API_URL;
fetch(`${process.env.REACT_APP_API_URL}/api/tasks`)



const MainPanel = ({ tasks, setTasks, fetchTasks, logout, loading, view }) => {
  const navigate = useNavigate();
  const [currentFilter, setCurrentFilter] = useState('all');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [addLoading, setAddLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  // Remove local view state and setView

  // Add task
  const handleAdd = async ({ title, category }) => {
    setAddLoading(true);
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category, status: 'pending', createdAt: new Date().toISOString() })
      });
      await fetchTasks();
    } catch (err) {
      alert('Failed to add task.');
    }
    setAddLoading(false);
  };

  // Edit task (show input)
  const handleEdit = (id, value) => {
    setEditingTaskId(id);
    setEditValue(value);
  };

  // Save edited task
  const handleSaveEdit = async (id) => {
    if (!editValue.trim()) return;
    const task = tasks.find(t => t._id === id);
    if (!task) return;
    setEditLoading(true);
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, title: editValue.trim() })
      });
      setEditingTaskId(null);
      setEditValue('');
      await fetchTasks();
    } catch (err) {
      alert('Failed to update task.');
    }
    setEditLoading(false);
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditValue('');
  };

  // Complete/Undo task
  const handleComplete = async (id) => {
    const task = tasks.find(t => t._id === id);
    if (!task) return;
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, status: task.status === 'completed' ? 'pending' : 'completed' })
      });
      await fetchTasks();
    } catch (err) {
      alert('Failed to update task status.');
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      await fetchTasks();
    } catch (err) {
      alert('Failed to delete task.');
    }
  };

  // Stats
  const today = new Date().toISOString().slice(0, 10);
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'completed').length;
  const todayCount = tasks.filter(t => t.createdAt && t.createdAt.slice(0, 10) === today).length;
  const productivity = total === 0 ? 0 : Math.round(100 * completed / total);

  // For editing input
  const handleEditInput = (id, value) => {
    setEditValue(value);
  };

  // For TasksContainer, pass editValue to the editing task
  const tasksWithEdit = editingTaskId
    ? tasks.map(t => t._id === editingTaskId ? { ...t, title: editValue } : t)
    : tasks;

  // Responsive styles
  const containerStyle = {
    maxWidth: 900,
    margin: '0 auto',
    padding: '32px 8px',
  };
  const titleStyle = {
    margin: '0 0 32px 0',
    fontSize: 'clamp(1.5rem, 6vw, 2.4rem)',
    letterSpacing: 1,
    fontWeight: 900,
    color: '#4f8cff',
    textAlign: 'center',
    textShadow: '0 2px 12px #6ed6ff33',
    wordBreak: 'break-word',
  };
  const navBarStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(90deg,#e0e7ff 0%,#f0f4fa 100%)',
    borderRadius: 32,
    boxShadow: '0 4px 24px #4f8cff22',
    padding: '12px 4px 12px 8px',
    marginBottom: 28,
    gap: 8,
    flexWrap: 'wrap',
    overflowX: 'auto',
    minWidth: 0,
  };
  const navBtnStyle = isActive => ({
    padding: '8px 16px',
    marginRight: 8,
    marginBottom: 6,
    border: 'none',
    borderRadius: 24,
    background: isActive ? 'linear-gradient(90deg,#4f8cff,#6ed6ff)' : 'rgba(255,255,255,0.15)',
    color: isActive ? 'white' : '#4f8cff',
    fontWeight: isActive ? 700 : 600,
    fontSize: 'clamp(0.95rem, 3vw, 1.1rem)',
    cursor: 'pointer',
    boxShadow: isActive ? '0 2px 12px rgba(79,140,255,0.18)' : 'none',
    transition: 'all 0.2s',
    outline: isActive ? '2px solid #6ed6ff' : 'none',
    minWidth: 90,
    flex: '1 0 90px',
    maxWidth: '100%',
    whiteSpace: 'nowrap',
  });
  const logoutBtnStyle = {
    ...navBtnStyle(false),
    background: 'linear-gradient(90deg,#ff4f4f,#ffb36e)',
    color: 'white',
    marginLeft: 16,
  };
  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>TaskFlow Analytics</h1>
      <div style={navBarStyle}>
        <button style={navBtnStyle(view === 'dashboard')} onClick={() => navigate('/dashboard')}>Dashboard</button>
        <button style={navBtnStyle(view === 'insights')} onClick={() => navigate('/insights')}>Insights</button>
        <button style={navBtnStyle(view === 'analytics')} onClick={() => navigate('/analytics')}>Analytics</button>
        <button style={logoutBtnStyle} onClick={logout}>Logout</button>
      </div>
      {view === 'dashboard' && (
        <>
          <TaskInput onAdd={handleAdd} loading={addLoading} />
          <StatsGrid total={total} completed={completed} today={todayCount} productivity={productivity} />
          <FilterTabs current={currentFilter} onChange={setCurrentFilter} />
          <TasksContainer
            tasks={tasksWithEdit}
            filter={currentFilter}
            onEdit={handleEdit}
            onEditInput={handleEditInput}
            onDelete={handleDelete}
            onComplete={handleComplete}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
            editingTaskId={editingTaskId}
          />
        </>
      )}
      {view === 'insights' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <button style={navBtnStyle(false)} onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
          </div>
          <Insights tasks={tasks} />
        </>
      )}
      {view === 'analytics' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <button style={navBtnStyle(false)} onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
          </div>
          <Analytics tasks={tasks} />
        </>
      )}
    </div>
  );
};

export default MainPanel; 