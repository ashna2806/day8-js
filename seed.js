require("dotenv").config();
const mongoose = require("mongoose");
const Task = require("./models/Task");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to DB");

    await Task.deleteMany();

    await Task.insertMany([
     {
  title: "Learn MongoDB",
  description: "Study basics",
  priority: "high",
  dueDate: new Date("2026-06-25")
},
      {
        title: "Learn Mongoose",
        description: "Schema and models",
        priority: "high",
        dueDate: new Date("2026-06-26")
      },
      {
        title: "Build API",
        description: "Express CRUD routes",
        priority: "medium",
        dueDate: new Date("2026-07-28")
      },
      {
        title: "Test API",
        description: "Use Postman",
        priority: "medium",
        dueDate: new Date("2026-08-20")
      },
      {
        title: "Finish Project",
        description: "Submit assignment",
        priority: "high",
        dueDate: new Date("2025-06-12")
      }
    ]);

    const tasks = await Task.find();
    console.log("ALL TASKS:");
    console.log(tasks);

    process.exit();
  })
  .catch(err => console.log(err));