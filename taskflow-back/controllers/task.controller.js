const Task = require("../schemas/task")
const User = require("../schemas/user")
const Team = require("../schemas/team")

const create = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      status,
      team } = req.body
    const {id}= req.user
    
    const taskFound = await Task.findOne({ title })
    const userFound = await User.findById({ _id: id })
    
    if (taskFound) {
      return res.status(401).send({ message: "ya existe una tarea con ese nombre" })
    }
    
    if (team) {
      const teamFound = await Team.findOne({_id:team })
      if (!teamFound) {
        return res.status(401).send({ message: "El equipo no existe" })
      }
      
      const newTask = new Task({
        title,
        description,
        priority,
        status,
        team_id: teamFound._id,
        created_by:userFound._id
        }
      )    
      const taskSave = await newTask.save()

     return res.status(200).json({message:"tarea creada", taskSave})
    }
    
    const newTask = new Task({ title,
      description,
      priority,
      status,
      created_by:userFound._id
      }
    )
  
    const taskSave = await newTask.save()
    return res.status(200).json({ message: "tarea creada", taskSave })
    

  } catch (error) {
    return res.status(500).json({error})
  }
}

const deleteTask = async (req, res) => {
  const { _id } = req.body
  
  try {
    const taskDeleted = await Task.findOneAndDelete({ _id })

    if (!taskDeleted) return res.status(400).send({message:"La tarea se elimino anteriormente"})
    
   return res.status(200).send({message:"tarea eliminada con exito"})

  } catch (error) {
    return res.status(400).send(error.message)
  }
}

const getTasks = async (req, res) => {
  const { id } = req.user
  try {
    const userFound = await User.findOne({ _id: id })
    const tasksFound = await Task.find({ created_by: userFound._id })
  return  res.status(200).json(tasksFound)
  } catch (error) {
    return res.status(400).send(error.message)
    
  }
}

const updateTask = async (req, res) => {
  try {
    const {_id} = req.params
    const {
      title,
      description,
      priority,
      status,
      team } = req.body
   
    const taskFound = await Task.findOne({ _id })
    
    
    if (!taskFound) res.status(401).send({ message: "Esta tarea no existe" })
    
    if (team) {
      const teamFound = await Team.findOne({ _id: team })

      if (!teamFound) return res.status(401).send({ message: "El equipo no existe" })
     
        await Task.updateOne(
          { _id: taskFound._id },
          {
            $set: {
              title: title,
              description: description,
              priority: priority,
              status: status,
              team_id: teamFound._id,
            },
          }
        );
      
      return res.status(200).send({message:"tarea actualizada"})
    }

    await Task.updateOne(
      { _id: taskFound._id },
      {
        $set: {
          title: title,
          description: description,
          priority: priority,
          status: status,
        },
      }
    );
  
   return res.status(200).send({ message: "tarea actualizada" })
  } catch (error) {
   return res.status(400).send(error)
  }
}
  
const updateTaskStatus = async (req, res) => {
  try {
    const {_id} = req.params
    const { status } = req.body
    
    const taskFound = await Task.findOne({ _id })

    if (!taskFound) {
      return res.status(401).send({ message: "no se encontro la tarea" })
    }
    
      await Task.updateOne(
        { _id: taskFound._id },
        {
          $set: { status: status},
        }
      );
     return res.status(200).send({ message: "estado actualizada" })
  } catch (error) {
   return res.status(400).send(error)
  }
}
module.exports= {create , deleteTask, getTasks,updateTask, updateTaskStatus }