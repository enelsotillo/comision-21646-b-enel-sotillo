import { Router } from "express";
import { ctrolDeleteTask, ctrolGetTasks, ctrolPustTask, ctrolPutTask } from "../controllers/task.controllers.js";
export const taskRouter = Router();
import { crearTaskSchema, editTaskSchema } from "../model.table/schemas.tasks.js";
import { validator } from "../middlewares/validar.js";

//endpoint para todas las tareas
taskRouter.get('/api/tasks', ctrolGetTasks )

//endpoint para traer una por id 
//taskRouter.get('/api/id', ctrolPustTask )

//endpoint para crear una tarea
taskRouter.post('/api/tasks', crearTaskSchema,  validator, ctrolPustTask)

//endpoint para modificar una tarea por id
taskRouter.put('/api/tasks/:id', editTaskSchema, validator, ctrolPutTask)

//endpoint elimina una tarea por id
taskRouter.delete('/api/tasks/:id', ctrolDeleteTask)

