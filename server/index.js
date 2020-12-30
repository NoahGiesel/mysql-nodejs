const mysql = require ("mysql");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const PORT = 3000;



//BackEnd Server port run
app.use(bodyParser.json());
app.listen(PORT , ()=> console.log("Server started on port " + PORT ));



//middlewares 

app.get('/', (req, res) => {
    res.send('GET request to the homepage');
});

//get all users
app.get("/users",(req, res) => {
    mysqlConnection.query("SELECT * FROM users",(err , rows, fields) =>{
        if(!err) {
            res.send(rows);
        }
        else console.log(err)
    })
})

//get an user by ID 
app.get("/users/:id",(req, res) => {
    mysqlConnection.query("SELECT * FROM users WHERE UserID  = ?",[req.params.id],(err , rows, fields) =>{
        if(!err) {
            res.send(rows);
        }
        else console.log(err)
    })
})


//delete an user by ID 
app.delete("/users/:id",(req, res) => {
    mysqlConnection.query("DELETE FROM users WHERE UserID  = ?",[req.params.id],(err , rows, fields) =>{
        if(!err) {
            res.send("Deleted Successfully!");
        }
        else console.log(err)
    })
})

//Insert an user  
app.post("/users",(req, res) => {
    let usr = req.body;
    var sql = "SET @UserID = ?;SET @Name = ?;SET @UserCode = ?;SET @Salary = ?; \
               CALL UsersAddOrEdit(@UserID,@Name,@UserCode,@Salary);"
    mysqlConnection.query(sql,[usr.UserID,usr.Name,usr.UserCode,usr.Salary],(err , rows, fields) =>{
        if(!err) {
            rows.forEach(element =>{
                if(element.constructor == Array)
                res.send("Inserted User id : " + element[0].UserID)
            })
        }
        else console.log(err)
    })
})


//Update an user  
app.put("/users",(req, res) => {
    let usr = req.body;
    var sql = "SET @UserID = ?;SET @Name = ?;SET @UserCode = ?;SET @Salary = ?; \
               CALL UsersAddOrEdit(@UserID,@Name,@UserCode,@Salary);"
    mysqlConnection.query(sql,[usr.UserID,usr.Name,usr.UserCode,usr.Salary],(err , rows, fields) =>{
        if(!err) {
            res.send("Updated successfully")
            })
        }
        else console.log(err)
    })
})






//connection to MySQL DB
var mysqlConnection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "ciaociao",
    database :"UsersDB",
    multipleStatements : true
})

mysqlConnection.connect((err)=>{
    if(!err) {
        console.log("DB connection Succeded.")
    }else { 
        console.log("Error " + JSON.stringify(err,undefined, 2)) ;
    }
})