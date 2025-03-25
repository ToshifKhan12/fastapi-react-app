import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import FilterButtons from "./components/FilterButtons";

const API_URL = "http://127.0.0.1:8000/tasks";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // Fetch tasks from FastAPI
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  // Add Task
  const addTask = async (title) => {
    if (!title.trim()) return;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (response.ok) {
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
    }
  };

  // Toggle Task Completion
  const toggleComplete = async (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed }),
    });

    if (response.ok) {
      setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    if (response.ok) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  // Edit Task
  const editTask = async (id, newTitle) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle }),
    });

    if (response.ok) {
      setTasks(tasks.map((t) => (t.id === id ? { ...t, title: newTitle } : t)));
    }
  };

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-gray-100 text-black min-h-screen"}>
      <div className="max-w-2xl mx-auto p-5">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} setSearch={setSearch} />
        <TaskInput addTask={addTask} />
        <FilterButtons filter={filter} setFilter={setFilter} />
        <TaskList tasks={tasks} filter={filter} search={search} toggleComplete={toggleComplete} deleteTask={deleteTask} editTask={editTask} />
      </div>
    </div>
  );
};

export default App;





 










 