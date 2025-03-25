import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const TaskList = ({ tasks, filter, search, toggleComplete, deleteTask, editTask }) => {
  const [editId, setEditId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const handleEdit = (id, title) => {
    setEditId(id);
    setNewTitle(title);
  };

  const handleSave = (id) => {
    editTask(id, newTitle);
    setEditId(null);
  };

  return (
    <div>
      {tasks
        .filter((task) => {
          if (filter === "active") return !task.completed;
          if (filter === "completed") return task.completed;
          return true;
        })
        .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
        .map((task) => (
          <div key={task.id} className="flex justify-between items-center p-3 mb-2 border rounded bg-gray-800 text-white">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                className="mr-2"
              />
              {editId === task.id ? (
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="bg-gray-700 text-white p-1 rounded"
                />
              ) : (
                <span className={task.completed ? "line-through" : ""}>{task.title}</span>
              )}
            </div>
            <div className="flex gap-2">
              {editId === task.id ? (
                <button onClick={() => handleSave(task.id)} className="text-green-400">Save</button>
              ) : (
                <button onClick={() => handleEdit(task.id, task.title)} className="text-blue-400">
                  <FaEdit />
                </button>
              )}
              <button onClick={() => deleteTask(task.id)} className="text-red-400">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TaskList;
