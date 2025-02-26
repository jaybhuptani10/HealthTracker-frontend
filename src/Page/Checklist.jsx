import React, { useState, useEffect } from "react";
import "./css/Checklist.css"; // Import external CSS

const tasks = [
    { 
      id: 1, 
      name: "Morning Walk", 
      description: "Start your day with a 30-minute walk for better health.", 
      image: "https://tse1.mm.bing.net/th?id=OIP.sD2McSOOOcUxA4OES14XagHaE2&pid=Api&P=0&h=180" 
    },
    { 
      id: 2, 
      name: "Hydrate Well", 
      description: "Drink at least 8 glasses of water daily to stay hydrated.", 
      image: "https://tse2.mm.bing.net/th?id=OIP.4cBZtHMJ1rt9dq9lni3aawHaE8&pid=Api&P=0&h=180" 
    },
    { 
      id: 3, 
      name: "Healthy Diet", 
      description: "Eat a balanced diet rich in vegetables, fruits, and proteins.", 
      image: "https://tse2.mm.bing.net/th?id=OIP.k4R4BdRL9Kgs11KwG6V82QHaE8&pid=Api&P=0&h=180" 
    },
    { 
      id: 4, 
      name: "Medication", 
      description: "Take your prescribed medicines on time to stay healthy.", 
      image: "https://tse3.mm.bing.net/th?id=OIP.VDejbNC8mG2bU2dN7IvyogHaE8&pid=Api&P=0&h=180" 
    },
    { 
      id: 5, 
      name: "Light Exercise", 
      description: "Engage in simple exercises like stretching or yoga for flexibility.", 
      image: "https://tse2.mm.bing.net/th?id=OIP.dmmQcE11kZ8YmgnDtoU67AHaE8&pid=Api&P=0&h=180" 
    },
    { 
      id: 6, 
      name: "Adequate Sleep", 
      description: "Get at least 7-8 hours of sleep for a refreshed mind and body.", 
      image: "https://tse3.mm.bing.net/th?id=OIP.VNype4fnZddxTPBAohOrOAHaEK&pid=Api&P=0&h=180" 
    }
  ];
const Checklist = () => {
  const [checkedTasks, setCheckedTasks] = useState(() => {
    const savedTasks = localStorage.getItem("checkedTasks");
    return savedTasks ? JSON.parse(savedTasks) : {};
  });

  useEffect(() => {
    localStorage.setItem("checkedTasks", JSON.stringify(checkedTasks));
  }, [checkedTasks]);

  useEffect(() => {
    const now = new Date();
    const lastReset = localStorage.getItem("lastReset");
    if (!lastReset || new Date(lastReset).getDate() !== now.getDate()) {
      setCheckedTasks({});
      localStorage.setItem("lastReset", now);
    }
  }, []);

  const toggleTask = (id) => {
    setCheckedTasks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="checklist-container">
      <div className="checklist-grid">
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
            <img src={task.image} alt={task.name} className="task-image" />
            <h3 className="task-title">{task.name}</h3>
            <p className="task-description">{task.description}</p>
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={checkedTasks[task.id] || false}
                onChange={() => toggleTask(task.id)}
              />
              <span className="checkmark"></span>
              <span className="checkbox-label">Completed</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checklist;
