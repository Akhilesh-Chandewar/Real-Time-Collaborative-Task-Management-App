const express = require("express");
const app = express();
const cors = require('cors');
const path = require('path');

const errorMiddleware = require("./middlewares/error");

// Config
require("dotenv").config();

app.use(express.json({extended : true}));
app.use(cors());

app.get("/" , (req,res)=>{
    res.sendFile(path.resolve(__dirname, "pages" , "index.html"))
})

app.get("/login" , (req,res)=>{
    res.sendFile("pages/login.html" , {root : __dirname})
})

app.get("/signup" , (req,res)=>{
    res.sendFile("pages/signup.html" , {root : __dirname})
})

// app.get("/dashboard", (req,res)=>{
//     res.sendFile("pages/admin.html", {root : __dirname})
// })

app.get("/manage", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "pages" , "users.html"))
});

// Route Imports
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const projectRoutes = require("./routes/projectRoutes");

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/task", taskRoutes);
app.use("/api/v1/project", projectRoutes);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;