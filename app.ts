import express, { Request, Response } from "express";
import {v4 as uuidv4} from 'uuid';

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json())
const PORT = 3000;

interface Tasks {
    id: string;
    detail: string;
    status: boolean;
}


let todoList: Tasks[] = [
    { id: uuidv4(), detail: "Create Hello button", status: false },
    { id: uuidv4(), detail: "Build the To-Do app", status: false },
    { id: uuidv4(), detail: "Go have lunch", status: false }
];

app.get('/tasks', (req: Request, res: Response) => {
    res.status(200).json({ tasks: todoList });
});

app.post('/tasks', (req: Request, res: Response) => {
    const { detail, status } = req.body;
    // return false;
    const newTask = { id: uuidv4(), detail, status: status ? status : false };
    todoList.push(newTask);
    res.status(201).json(newTask);
});

app.put('/tasks/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { detail, status } = req.body;
    const taskIndex = todoList.findIndex((t: Tasks) => t.id === id);
    //console.log("taskIndex", taskIndex)
    if (taskIndex !== -1) {
        todoList[taskIndex].detail = detail || todoList[taskIndex].detail;
        todoList[taskIndex].status = status || todoList[taskIndex].status;
        res.status(201).json(todoList[taskIndex]);
    } else {
        res.status(404).json({ message: "Task not found" });
    }
});

app.delete('/tasks/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    todoList = todoList.filter((t: Tasks) => t.id !== id);
    res.status(200).json({ message: "Remove success.", tasks: todoList });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})