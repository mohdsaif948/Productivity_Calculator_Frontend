import React from 'react';

function getProductivityBreakdown(tasks) {
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const todayTasks = tasks.filter(t => t.createdAt && t.createdAt.slice(0, 10) === todayStr);
  const todayCompleted = todayTasks.filter(t => t.status === 'completed').length;
  const todayProd = todayTasks.length ? Math.round(100 * todayCompleted / todayTasks.length) : 0;
  const weekAgo = new Date(now); weekAgo.setDate(now.getDate() - 6);
  const weekTasks = tasks.filter(t => t.createdAt && t.createdAt.slice(0, 10) >= weekAgo.toISOString().slice(0, 10));
  const weekCompleted = weekTasks.filter(t => t.status === 'completed').length;
  const weekProd = weekTasks.length ? Math.round(100 * weekCompleted / weekTasks.length) : 0;
  const monthAgo = new Date(now); monthAgo.setMonth(now.getMonth() - 1);
  const monthTasks = tasks.filter(t => t.createdAt && t.createdAt.slice(0, 10) >= monthAgo.toISOString().slice(0, 10));
  const monthCompleted = monthTasks.filter(t => t.status === 'completed').length;
  const monthProd = monthTasks.length ? Math.round(100 * monthCompleted / monthTasks.length) : 0;
  return (
    <div style={{background:'rgba(255,255,255,0.10)',borderRadius:16,padding:'18px 20px 10px 20px',display:'flex',gap:24,justifyContent:'center',flexWrap:'wrap'}}>
      <div><b>Daily Productivity:</b> {todayProd}% <span style={{fontSize:12}}>({todayCompleted}/{todayTasks.length})</span></div>
      <div><b>Weekly Productivity:</b> {weekProd}% <span style={{fontSize:12}}>({weekCompleted}/{weekTasks.length})</span></div>
      <div><b>Monthly Productivity:</b> {monthProd}% <span style={{fontSize:12}}>({monthCompleted}/{monthTasks.length})</span></div>
    </div>
  );
}

const TasksContainer = ({ tasks, filter, onEdit, onEditInput, onDelete, onComplete, onSaveEdit, onCancelEdit, editingTaskId }) => {
  let filtered = tasks;
  const today = new Date().toISOString().slice(0, 10);
  if (filter === 'today') {
    filtered = tasks.filter(t => t.createdAt && t.createdAt.slice(0, 10) === today);
  } else if (filter === 'pending') {
    filtered = tasks.filter(t => t.status !== 'completed');
  } else if (filter === 'completed') {
    filtered = tasks.filter(t => t.status === 'completed');
  }
  return (
    <>
      {filter === 'completed' && (
        <div style={{marginBottom:20}}>{getProductivityBreakdown(tasks)}</div>
      )}
      <div className="tasks-container">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5C3.9 4 3 4.9 3 6v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM19 20H5V9h14v11z"/>
            </svg>
            <h3>Ready to conquer your day? 💪</h3>
            <p>Add your first task and start your productivity journey!</p>
          </div>
        ) : (
          filtered.map(task => (
            <div
              key={task._id}
              className={
                'task-item' +
                (task.status === 'completed' ? ' completed' : '') +
                (editingTaskId === task._id ? ' editing' : '')
              }
            >
              {editingTaskId === task._id ? (
                <>
                  <div className="task-content">
                    <input
                      id={`edit-input-${task._id}`}
                      className="task-edit-input"
                      value={task.title}
                      onChange={e => onEditInput(task._id, e.target.value)}
                    />
                    <div className="task-meta">
                      <span className="task-category">{task.category || ''}</span>
                      <span>{new Date(task.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="task-actions">
                    <button className="task-btn edit-save-btn" onClick={() => onSaveEdit(task._id)}>Save</button>
                    <button className="task-btn cancel-btn" onClick={onCancelEdit}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="task-content">
                    <span className="task-text">{task.title}</span>
                    <div className="task-meta">
                      <span className="task-category">{task.category || ''}</span>
                      <span>{new Date(task.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="task-actions">
                    <button className="task-btn complete-btn" onClick={() => onComplete(task._id)}>
                      {task.status === 'completed' ? 'Undo' : 'Complete'}
                    </button>
                    <button className="task-btn edit-btn" onClick={() => onEdit(task._id, task.title)}>Edit</button>
                    <button className="task-btn delete-btn" onClick={() => onDelete(task._id)}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default TasksContainer; 