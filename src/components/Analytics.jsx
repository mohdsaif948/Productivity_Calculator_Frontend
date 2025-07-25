import React from 'react';

const Analytics = ({ tasks }) => {
  // Daily Completion Trend (7 days)
  const today = new Date();
  let days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  const dailyCounts = days.map(day => tasks.filter(t => t.status === 'completed' && t.createdAt && t.createdAt.slice(0, 10) === day).length);

  // Category Breakdown
  const categories = {};
  tasks.forEach(t => {
    if (!categories[t.category]) categories[t.category] = 0;
    if (t.status === 'completed') categories[t.category]++;
  });
  const catKeys = Object.keys(categories).filter(k => k);

  // Weekly Performance Overview
  let week = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    week.push(d.toISOString().slice(0, 10));
  }
  const weekCompleted = week.map(day => tasks.filter(t => t.status === 'completed' && t.createdAt && t.createdAt.slice(0, 10) === day).length);

  return (
    <div className="analytics-grid">
      <div className="chart-container">
        <div className="chart-title">📈 Daily Completion Trend (7 Days)</div>
        <div className="chart" id="dailyChart">
          {days.map((day, i) => (
            <div className="bar" key={day} style={{height: 30 + dailyCounts[i] * 30}}>
              <span className="bar-value">{dailyCounts[i]}</span>
              <span className="bar-label">{new Date(day).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="chart-container">
        <div className="chart-title">🏷️ Category Breakdown</div>
        <div className="chart" id="categoryChart">
          {catKeys.length === 0 ? (
            <span style={{color:'white'}}>No completed tasks</span>
          ) : (
            catKeys.map(cat => (
              <div className="bar" key={cat} style={{height: 30 + categories[cat] * 30}}>
                <span className="bar-value">{categories[cat]}</span>
                <span className="bar-label">{cat}</span>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="chart-container" style={{gridColumn: '1 / -1'}}>
        <div className="chart-title">📊 Weekly Performance Overview</div>
        <div className="chart" id="weeklyChart">
          {week.map((day, i) => (
            <div className="bar" key={day} style={{height: 30 + weekCompleted[i] * 30}}>
              <span className="bar-value">{weekCompleted[i]}</span>
              <span className="bar-label">{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date(day).getDay()]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics; 