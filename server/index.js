const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "elsa2700", // change into elsa2700
  database: "employeeSystem",
});

// create route
app.post("/create", (req, res) => {
  // build var
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  // query db
  db.query(
    "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted!");
      }
    }
  );
});

app.get("/employees", (req, res) => {
  // query
  db.query("SELECT * FROM employees",(err, result)=>{
    if(err){
      console.log(err);
    }else{
      res.send(result)
    }
  });
});

app.listen(3001, () => {
  console.log("ur server is running at port 3001");
});
