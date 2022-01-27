const express = require("express");
const pool = require("./database");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//listen to these urls on 5000

app.get("/todos", async (req, res) => {
  try {
    //grab todos from database
    console.log("INSIDE get all todos");
    const todos = await pool.query("SELECT * FROM todo");
    console.log(todos.rows);

    //return todos from front end
    res.json(todos.rows);
  } catch (error) {
    console.log(e.message);
  }
});

//localhost: 5000/todos/1
//First, get the id from the params
//Next, use the id to query the database. Use the pool variable to query

app.get("/todos/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id]);
    console.log(todo);
    res.json(todo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
