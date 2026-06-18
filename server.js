require("dotenv").config();
const express = require("express");
const connectDB = require("./index");
const Task = require("./models/Task");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= DB CONNECTION ================= */
connectDB();

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.send("Server running with MongoDB Atlas");
});

/* ================= CREATE TASK ================= */
app.post("/api/tasks", async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);

    const { title, description, status, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required"
      });
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
});

/* ================= GET ALL TASKS ================= */
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= GET TASK BY ID ================= */
app.get("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= UPDATE TASK ================= */
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* ================= DELETE TASK ================= */
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});