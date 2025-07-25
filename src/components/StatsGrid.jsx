const StatsGrid = ({ total, completed, today, productivity }) => (
  <div className="stats-grid">
    <div className="stat-card">
      <div className="stat-number" id="totalTasks">{total}</div>
      <div className="stat-label">Total Tasks</div>
    </div>
    <div className="stat-card">
      <div className="stat-number" id="completedTasks">{completed}</div>
      <div className="stat-label">Completed</div>
    </div>
    <div className="stat-card">
      <div className="stat-number" id="todayTasks">{today}</div>
      <div className="stat-label">Today's Tasks</div>
    </div>
    <div className="stat-card productivity-score">
      <div className="stat-number" id="productivityScore">{productivity}%</div>
      <div className="stat-label">Productivity Score</div>
    </div>
  </div>
);

export default StatsGrid; 