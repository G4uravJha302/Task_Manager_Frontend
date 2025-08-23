import AddTask from "./addtask";
import "./Dashboard.css";
import { useEffect, useState } from "react";
import TaskDisplay from "./task-display";
export default function Dashboard() {
  const [activeView, setActiveView] = useState("view"); // 'view' | 'add'
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const api = await fetch("https://task-manager-backend-1-kwg8.onrender.com/task/gettask", {
          method: "GET",
          credentials: "include"
        });
        const object = await api.json();
        if (object && Array.isArray(object.tasks)) {
          setTasks(object.tasks);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return (
    <>
      <nav className="sidebar-nav" aria-label="Main navigation">
        <ul className="sidebar-list">
          <li>
            <a href="#tasks" className="sidebar-link">
              My Tasks
            </a>
          </li>
          <li>
            <a href="#projects" className="sidebar-link">
              My Projects
            </a>
          </li>
          <li>
            <a href="#settings" className="sidebar-link">
              Settings
            </a>
          </li>
          <li>
            <a href="#logout" className="sidebar-link">
              Logout
            </a>
          </li>
        </ul>
      </nav>
      <div className="dashboard-layout">
        <div className="left-section">
          <div className="Menu">
            <ul>
              <li>
                <a
                  href="#view-tasks"
                  className={activeView === "view" ? "active" : ""}
                  onClick={(e) => { e.preventDefault(); setActiveView("view"); }}
                >
                  View Tasks
                </a>
              </li>
              <li>
                <a
                  href="#add-task"
                  className={activeView === "add" ? "active" : ""}
                  onClick={(e) => { e.preventDefault(); setActiveView("add"); }}
                >
                  Add Task
                </a>
              </li>
              <li>
                <a href="#edit-task">Edit Task</a>
              </li>
              <li>
                <a href="#delete-task">Delete Task</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="right-section">
          {activeView === "view" && (
            loading ? (
              <div className="task-list-container">Loading tasks...</div>
            ) : (
              <TaskDisplay tasks={tasks} />
            )
          )}
          {activeView === "add" && (
            <AddTask
              onAdded={(task) => {
                if (task) {
                  setTasks((prev) => [...prev, task]);
                }
                setActiveView("view");
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}

