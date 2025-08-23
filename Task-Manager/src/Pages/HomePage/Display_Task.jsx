import React from "react"
import "../DashBoard/Dash_Board.css";
export default function TaskDisplay({ tasks }) {
  const hasTasks = Array.isArray(tasks) && tasks.length > 0;
  return (
    <div className="task-list-container">
      {hasTasks ? (
        <table className="task-list">
          <thead className="task-list-header">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="task-list-body">
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ padding: "16px", color: "#636e72" }}>No tasks yet.</div>
      )}
    </div>
  )
}