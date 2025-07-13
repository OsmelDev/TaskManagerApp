const Task = require("../schemas/task");
const Team = require("../schemas/team");
const User = require("../schemas/user");

const create = async (req, res) => {
  const { name, description } = req.body;
  const { id } = req.user;

  try {
    const teamFound = await Team.findOne({ name });
    const userFound = await User.findOne({ _id: id });

    if (teamFound)
      return res
        .status(404)
        .send({ message: "Ya existe un equipo con ese nombre" });

    const newTeam = new Team({
      name,
      description,
      created_by: userFound._id,
    });

    const teamSaved = await newTeam.save();
    return res
      .status(200)
      .send({ message: "Equipo creado satisfactoriamente" });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getTeams = async (req, res) => {
  const userFound = await User.findById({ _id: req.user.id });
  const teamsFound = await Team.find({ created_by: userFound._id });

  if (!teamsFound)
    res.status(401).send({ message: "No se encontro ningun equipo" });

  return res.status(200).json(teamsFound);
};

const addMembers = async (req, res) => {
  const { teamId, email } = req.body;
  
  try {
    const userFound = await User.findOne({ email });
    if (!userFound)
      return res.status(404).send({ message: "No se encontro el usuario" });

    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      { $addToSet: { members: userFound._id } },
      { new: true }
    );

    return res.status(200).json({ message: "Usuario agregado al equipo" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const removeMember = async (req, res) => {
  const { teamId, email } = req.body;

  try {
    const userFound = await User.findOne({ email })
    if(!userFound) return res.status(404).send({ message: "No se encontro el usuario" });
 
    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      { $pull: { members: userFound._id } },
      { new: true }
    );

    return res.status(200).json({ message: "Usuario eliminado del equipo" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getTaskTeam = async (req, res) => {
  const { _id } = req.params;
  try {
    const tasksFound = await Task.find({ team_id: _id })
      .populate({
        path: "audioNote",
        select: "_id duration size createdAt", 
        match: { associatedTeam: _id},
      })
      .lean();
    if (!tasksFound)
      return res.status(404).send({ message: "No se encontraron tareas" });

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

    if(tasksWithAudio)
      return res.status(200).json(tasksWithAudio);

    return res.status(200).json(tasksFound);
  } catch (error) {
    return res.status(500).send(error);

  }
};
module.exports = { create, getTeams, getTaskTeam, addMembers, removeMember };
