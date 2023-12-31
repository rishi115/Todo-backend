const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
const task = require('./taskmodel');
const functions =require("firebase-functions");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/task', async (req, res) => {
    console.log(req.body);
    const Ta = await task.create(req.body)
    .then(data => {
        res.status(201).json({ taskId: data._id });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
    })

 app.get('/tasks/:taskId', async (req, res) => {
        try {
          const taskId = req.params.taskId;
      
          // Find the task based on the provided ID
          const foundTask = await task.findById(taskId);
      
          if (!foundTask) {
            return res.status(404).json({ error: 'Task not found' });
          }
      
          // If the task is found, send it in the response
          res.status(200).json(foundTask);
        } catch (error) {
          console.error("Error fetching task:", error);
          res.status(500).send("Error fetching task");
        }
      });


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    })


mongoose.connect('mongodb+srv://rishidevare:Rishi7058257628@todo.nscczf5.mongodb.net/todo?retryWrites=true&w=majority')
    .then(() => console.log('Connected to MongoDB...'))

  
 exports.api = functions.https.onRequest(app);