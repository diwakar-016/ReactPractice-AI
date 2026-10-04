import { useState } from "react";

function formatCreatedAt(createdAt) {
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return "Added recently";

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(todo.title);

  const startEditing = () => {
    setDraftTitle(todo.title);
    setIsEditing(true);
  };

  const saveEdit = (event) => {
    event.preventDefault();
    const title = draftTitle.trim();
    if (!title) return;
    onUpdate(todo.id, { title });
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setDraftTitle(todo.title);
    setIsEditing(false);
  };

  const confirmDelete = () => {
    if (window.confirm(`Delete "${todo.title}"? This can’t be undone.`)) {
      onDelete(todo.id);
    }
  };

  return (
    <article className={`todo-card${todo.completed ? " is-completed" : ""}`}>
      <button
        className="complete-control"
        type="button"
        role="checkbox"
        aria-checked={todo.completed}
        aria-label={
          todo.completed
            ? `Mark "${todo.title}" as pending`
            : `Mark "${todo.title}" as completed`
        }
        onClick={() => onToggle(todo)}
      >
        {todo.completed && (
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="m3.5 8 3 3 6-6" />
          </svg>
        )}
      </button>

      <div className="todo-content">
        {isEditing ? (
          <form className="edit-form" onSubmit={saveEdit}>
            <label className="sr-only" htmlFor={`edit-${todo.id}`}>
              Edit task
            </label>
            <input
              id={`edit-${todo.id}`}
              className="edit-input"
              value={draftTitle}
              onChange={(event) => setDraftTitle(event.target.value)}
              maxLength={240}
              autoFocus
            />
            <div className="edit-actions">
              <button className="save-button" type="submit" disabled={!draftTitle.trim()}>
                Save
              </button>
              <button
                className="cancel-button"
                type="button"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <p className="todo-title">{todo.title}</p>
            <div className="todo-meta">
              <span>{formatCreatedAt(todo.createdAt)}</span>
              <span className="meta-dot" aria-hidden="true">
                ·
              </span>
              <span className="status-label">
                {todo.completed ? "Completed" : "In progress"}
              </span>
            </div>
          </>
        )}
      </div>

      {!isEditing && (
        <div className="todo-actions">
          <button
            className="icon-button edit-action"
            type="button"
            onClick={startEditing}
            aria-label={`Edit "${todo.title}"`}
            title="Edit task"
          >
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="m13.7 4.3 2 2M4 16l3.3-.7L16 6.6a1.4 1.4 0 0 0-2-2L5.3 13.3 4 16Z" />
            </svg>
          </button>
          <button
            className="icon-button delete-action"
            type="button"
            onClick={confirmDelete}
            aria-label={`Delete "${todo.title}"`}
            title="Delete task"
          >
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M4.5 6h11M8 6V4h4v2m2.5 0-.6 10h-7L6.3 6m2.2 3v4m3-4v4" />
            </svg>
          </button>
        </div>
      )}
    </article>
  );
}

export default TodoItem;
