const mongoose =require("mongoose")
const express = require('express');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    uid:String,
    creatername:String,
    task: String,
    description: String,
    date: String,
    time: String,
    status: String
})

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
