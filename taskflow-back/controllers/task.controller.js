const Task = require("../schemas/task")
const User = require("../schemas/user")
const Team = require("../schemas/team")
const VoiceNote = require("../schemas/voice");

const saveVoiceNote = async (req, teamId) => {
  try {
    if (!req.file) {
      throw new Error('No se proporcionó ningún archivo de audio');
    }
    const { duration = 0 } = req.body; 

    const newVoiceNote = new VoiceNote({
      audioData: req.file.buffer,
      contentType: req.file.mimetype,
      duration: Number(duration),
      size: req.file.size,
      created_by: req.user.id,
      associatedTeam: teamId,
    });

    await newVoiceNote.save();
    return newVoiceNote;

  } catch (error) {
     throw error; 
  }
};

const create = async (req, res) => {
  try {
    const { title, description, priority, status, team } = req.body;
    const { id } = req.user;

    
    if (await Task.findOne({ title })) {
      return res.status(400).json({ message: "Ya existe una tarea con ese nombre" });
    }

  
    const userFound = await User.findById(id);
    if (!userFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

  
    let teamId = null;
    if (team && team !== "undefined") {
      const teamExists = await Team.exists({ _id: team });
      if (!teamExists) {
        return res.status(404).json({ message: "El equipo no existe" });
      }
      teamId = team;
    }

   
    let voiceNoteId = null;
    if (req.file) {
      try {
        const voiceNote = await saveVoiceNote(req);
        voiceNoteId = voiceNote._id;
      } catch (error) {
        return res.status(500).json({ 
          error: "Error al guardar la nota de voz",
          details: error.message 
        });
      }
    }

    const newTask = new Task({
      title,
      description,
      priority,
      status,
      team_id: teamId,
      created_by: id,
      audioNote: voiceNoteId
    });

    const taskSave = await newTask.save();

    return res.status(201).json({
      message: "Tarea creada exitosamente",
      data: taskSave
    });

  } catch (error) {
    return res.status(500).json({ 
      error: "Error interno del servidor",
      details: error.message 
    });
  }
};

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
  const { id } = req.user;
  try {
   
    const userFound = await User.findById(id);
    if (!userFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const tasksFound = await Task.find({ created_by: userFound._id })
      .populate({
        path: 'audioNote',
        select: '_id duration size createdAt',
        match: { created_by: userFound._id }
      })
      .lean(); 

    const tasksWithAudio = tasksFound.map(task => {

      let audioUrl = null;
      if (task.audioNote) {
        audioUrl = `/notes/voice-notes/${task.audioNote}`;
      }
      
      return {
        ...task,
        voiceNote: task.audioNote ? audioUrl : null
      }
    });


    return res.status(200).json(tasksWithAudio);
  } catch (error) {
    return res.status(500).json({ 
      error: "Error interno del servidor",
      details: error.message 
    });
  }
};

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