function TodoFilter({ filters, activeFilter, onChange }) {
  return (
    <div className="filter-group" role="group" aria-label="Filter tasks">
      {filters.map((filter) => (
        <button
          className={`filter-button${activeFilter === filter ? " is-active" : ""}`}
          key={filter}
          type="button"
          aria-pressed={activeFilter === filter}
          onClick={() => onChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default TodoFilter;
