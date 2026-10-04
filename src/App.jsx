import { useEffect, useState } from "react";
import TodoFilter from "./components/TodoFilter.jsx";
import TodoForm from "./components/TodoForm.jsx";
import TodoList from "./components/TodoList.jsx";
import TodoStats from "./components/TodoStats.jsx";

const STORAGE_KEY = "my-todos";
const FILTERS = ["All", "Pending", "Completed"];

function loadTodos() {
  try {
    const storedTodos = localStorage.getItem(STORAGE_KEY);
    if (!storedTodos) return [];

    const parsedTodos = JSON.parse(storedTodos);
    if (!Array.isArray(parsedTodos)) return [];

    return parsedTodos.filter(
      (todo) =>
        todo &&
        (typeof todo.id === "string" || typeof todo.id === "number") &&
        typeof todo.title === "string" &&
        typeof todo.completed === "boolean" &&
        typeof todo.createdAt === "string",
    );
  } catch {
    return [];
  }
}

function App() {
  const [todos, setTodos] = useState(loadTodos);
  const [activeFilter, setActiveFilter] = useState("All");
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [todos]);

  const addTodo = (title) => {
    const newTodo = {
      id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((currentTodos) => [newTodo, ...currentTodos]);
  };

  const updateTodo = (id, updates) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (activeFilter === "Pending") return !todo.completed;
    if (activeFilter === "Completed") return todo.completed;
    return true;
  });

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <main className="page-shell">
      <section className="todo-app" aria-labelledby="app-title">
        <header className="app-header">
          <div className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path
                d="M9 16.5 13.5 21 23 11"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="3.5"
                y="3.5"
                width="25"
                height="25"
                rx="8"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
          <p className="eyebrow">A LITTLE MORE FOCUSED</p>
          <h1 id="app-title">My Todo</h1>
          <p className="app-subtitle">
            Organize your day, one task at a time.
          </p>
        </header>

        <TodoStats total={todos.length} completed={completedCount} />
        <TodoForm onAdd={addTodo} />

        <div className="list-toolbar">
          <div>
            <h2>Your tasks</h2>
            <p className="list-caption">
              {todos.length === 0
                ? "A fresh start is a lovely thing."
                : `${todos.length} ${todos.length === 1 ? "thing" : "things"} on your list`}
            </p>
          </div>
          <TodoFilter
            filters={FILTERS}
            activeFilter={activeFilter}
            onChange={setActiveFilter}
          />
        </div>

        {storageError && (
          <p className="storage-warning" role="alert">
            Your browser couldn’t save these changes. Check your storage
            settings and try again.
          </p>
        )}

        <TodoList
          todos={filteredTodos}
          filter={activeFilter}
          onToggle={(todo) =>
            updateTodo(todo.id, { completed: !todo.completed })
          }
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />
        <footer className="app-footer">
          <span className="footer-sparkle" aria-hidden="true">
            ✳
          </span>
          One step at a time. You’ve got this.
        </footer>
      </section>
    </main>
  );
}

export default App;
