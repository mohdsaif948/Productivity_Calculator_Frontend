const FILTERS = [
  { key: 'all', label: '🔍 All' },
  { key: 'today', label: '📅 Today' },
  { key: 'pending', label: '⏳ Pending' },
  { key: 'completed', label: '✅ Completed' },
];

const FilterTabs = ({ current, onChange }) => (
  <div className="filter-tabs">
    {FILTERS.map(f => (
      <div
        key={f.key}
        className={`filter-tab${current === f.key ? ' active' : ''}`}
        onClick={() => onChange(f.key)}
      >
        {f.label}
      </div>
    ))}
  </div>
);

export default FilterTabs; 