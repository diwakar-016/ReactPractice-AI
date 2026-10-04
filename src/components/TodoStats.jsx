function TodoStats({ total, completed }) {
  const pending = total - completed;
  const completion = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <section className="stats-card" aria-label="Task summary">
      <div className="stats-topline">
        <span className="stats-heading">Your progress</span>
        <span className="progress-percent">{completion}%</span>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-label="Tasks completed"
        aria-valuenow={completion}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <span className="progress-fill" style={{ width: `${completion}%` }} />
      </div>
      <div className="stats-counts">
        <div className="stat-item">
          <span className="stat-number">{total}</span>
          <span className="stat-label">Total tasks</span>
        </div>
        <span className="stat-divider" aria-hidden="true" />
        <div className="stat-item">
          <span className="stat-number completed-number">{completed}</span>
          <span className="stat-label">Completed</span>
        </div>
        <span className="stat-divider" aria-hidden="true" />
        <div className="stat-item">
          <span className="stat-number pending-number">{pending}</span>
          <span className="stat-label">Pending</span>
        </div>
      </div>
    </section>
  );
}

export default TodoStats;
