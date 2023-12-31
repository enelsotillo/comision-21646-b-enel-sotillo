import { json } from "sequelize";
import { taskModel } from "../model.table/model-tasks.js"

//controllers view para el frontEnd
export const ctrolView = async (req, res) => {
   try {
      const tasks = await taskModel.findAll();
      return res.render('tasks.ejs', {tasks});
   } catch (error) {
      console.error(error)
      return res.status(500).json({
         message: 'error del servidor'
      })
   }
}

//controlador pust para crear tarea
export const ctrolPustTask = async (req, res) => {
   try {
      const newTask = await taskModel.create(req.body)
      console.log(newTask)
      return res.status(201).json(newTask)

   } catch (error) {
      console.error(error)
      return res.status(500).json({
         message: 'error interno del servidor'
      })
   }
}

//controlador Put para modificar tarea
export const ctrolPutTask = async (req, res) => {
   const { id } = req.params
   try {
      const task = await taskModel.findByPk(id)

      if (!task) {
         res.status(404).json({
            message: 'tarea no encontrada'
         })
      }

      task.update(req.body)
      return res.status(200).json(task)

   } catch (error) {
      console.error(error)
      return res.status(500).json({
         message: 'error interno del servidor'
      })
   }
}

//controlador Delete para eliminar tarea
export const ctrolDeleteTask = (req, res) => {
   const { id } = req.params
   try {
      const taskDelete = taskModel.destroy({
         where: {
            id: id
         }

      })
      if (!taskDelete) {
         return res.status(404).json({
            message: 'tarea en contrada'
         })
      }
      return res.status(201).json({
         message: 'tarea eliminada'
      })
   } catch (error) {
      console.error(error)
      return res.status(500).json({
         message: 'error interno del servidor'
      })
   }
}
