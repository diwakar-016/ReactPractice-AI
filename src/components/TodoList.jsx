import TodoItem from "./TodoItem.jsx";

function TodoList({ todos, filter, onToggle, onUpdate, onDelete }) {
  if (todos.length === 0) {
    const isFiltered = filter !== "All";

    return (
      <div className="empty-state">
        <div className="empty-illustration" aria-hidden="true">
          <svg viewBox="0 0 64 64" fill="none">
            <rect
              x="15"
              y="10"
              width="34"
              height="45"
              rx="8"
              fill="#F1F0FF"
              stroke="#DCD9FA"
              strokeWidth="2"
            />
            <path
              d="M24 24h16M24 32h16M24 40h9"
              stroke="#9690D9"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="47" cy="47" r="10" fill="#E2F5EB" />
            <path
              d="m43 47 2.5 2.5 5-5"
              stroke="#50A878"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3>{isFiltered ? `No ${filter.toLowerCase()} tasks` : "It’s all clear"}</h3>
        <p>
          {isFiltered
            ? "Try another filter to see more of your list."
            : "Nothing on your list just yet. Add a task and make today yours."}
        </p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TodoList;
