const Insights = ({ tasks }) => {
  if (tasks.length === 0) {
    return (
      <div className="insights-panel">
        <div className="insight-item">
          <div className="insight-title">🎯 Welcome to TaskFlow!</div>
          <div className="insight-text">Start by adding a few tasks to unlock powerful productivity insights and personalized recommendations!</div>
        </div>
      </div>
    );
  }
  const completed = tasks.filter(t => t.status === 'completed').length;
  const pending = tasks.filter(t => t.status !== 'completed').length;
  const today = new Date().toISOString().slice(0, 10);
  const todayTasks = tasks.filter(t => t.createdAt && t.createdAt.slice(0, 10) === today);
  const todayCompleted = todayTasks.filter(t => t.status === 'completed').length;
  const productivity = tasks.length === 0 ? 0 : Math.round(100 * completed / tasks.length);
  const categories = {};
  tasks.forEach(t => {
    if (!categories[t.category]) categories[t.category] = 0;
    if (t.status === 'completed') categories[t.category]++;
  });
  const topCat = Object.entries(categories).filter(([k]) => k).sort((a, b) => b[1] - a[1])[0];
  return (
    <div className="insights-panel">
      <div className="insight-item">
        <div className="insight-title">📊 Productivity Score</div>
        <div className="insight-text">Your overall productivity score is <b>{productivity}%</b>. {productivity > 70 ? 'Great job! Keep it up!' : productivity > 40 ? 'You can do even better! Try to complete more tasks.' : 'Let’s focus on completing more tasks for a higher score.'}</div>
      </div>
      {todayTasks.length > 0 && (
        <div className="insight-item">
          <div className="insight-title">📅 Today’s Progress</div>
          <div className="insight-text">You have completed <b>{todayCompleted}</b> out of <b>{todayTasks.length}</b> tasks today.</div>
        </div>
      )}
      {pending > 0 && (
        <div className="insight-item">
          <div className="insight-title">⏳ Pending Tasks</div>
          <div className="insight-text">You have <b>{pending}</b> pending tasks. Try to complete them for a productivity boost!</div>
        </div>
      )}
      {topCat && (
        <div className="insight-item">
          <div className="insight-title">🏷️ Most Completed Category</div>
          <div className="insight-text">You complete most tasks in <b>{topCat[0]}</b> category. Keep leveraging your strengths!</div>
        </div>
      )}
    </div>
  );
};

export default Insights; 