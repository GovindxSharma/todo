import React, { useState } from "react";

// Simple, single-file React To‑Do List
// Features: add task, mark as completed, delete task
// Note: No styling libraries or Tailwind CSS used

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  function addTask() {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTasks((prev) => [...prev, { id: Date.now(), text: trimmed, completed: false }]);
    setText("");
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") addTask();
  }

  return (
    <div>
      <h1>To‑Do List</h1>

      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task and press Enter"
          aria-label="Task input"
        />
        <button onClick={addTask} disabled={!text.trim()}>
          Add
        </button>
      </div>

      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  aria-label={`Mark ${task.text} as ${task.completed ? "incomplete" : "completed"}`}
                />
                {" "}
                {task.completed ? <del>{task.text}</del> : task.text}
              </label>
              {" "}
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}