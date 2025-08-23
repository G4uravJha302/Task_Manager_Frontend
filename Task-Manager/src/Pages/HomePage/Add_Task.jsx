import { useState } from "react";
import "../DashBoard/Dash_Board.css"; 
export default function AddTask({ onAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit   = async (e) => {
    e.preventDefault();
    if(!title || !description || !status){
      alert('fill all fields');
      return; 
    }
    try {
      setSubmitting(true);
      const api = await fetch("https://task-manager-backend-1-kwg8.onrender.com/task/addtask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, description, status }),
        credentials: "include"
      });
      const object = await api.json();  
      if (object && object.task) {
        if (onAdded) onAdded(object.task);
      }
      setTitle("");
      setDescription("");
      setStatus("");
    } catch (err) {
      console.error(err);
      alert("Failed to add task. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    <div className="addtask-flex-row">
      <form className="task-form" onSubmit={handleSubmit}>
        <h2>Add Task</h2>
        <input type="text" placeholder="Task Name" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input type="text" placeholder="Task Description" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input type="text" placeholder="Task Status" 
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />

        <button className="btn" type="submit" disabled={submitting}>{submitting ? "Adding..." : "Add Task"}</button>
        <button className="btn" type="button" onClick={() => { setTitle(""); setDescription(""); setStatus(""); }}>
          Clear
        </button>
      </form>
    </div>
    </>
  );
}
