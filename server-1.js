const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.set("view engine", "ejs");

let tasks = []; // store tasks in memory
let idCounter = 1;

//Get All Tasks
app.get("/", (req,res) => {
    res.render("tasks", {tasks});
});

//Add a New Task
app.post("/add", (req,res) => {
    tasks.push({id: idCounter++, name: req.body.task});
    res.redirect("/");
});


//Delete a Task By ID
app.post("/delete", (req,res) => {
    const taskId = parseInt(req.body.id);
    tasks = tasks.filter(t => t.id !==taskId);
    res.redirect("/");
});

app.post("/update", (req, res) =>{
    const task= tasks.find(task => task.id == req.body.id);
    if (task) task.name = req.body.updatedTask;
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});