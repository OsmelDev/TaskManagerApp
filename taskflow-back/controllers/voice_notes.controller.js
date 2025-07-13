const VoiceNote = require("../schemas/voice")

const getVoiceNotes = async (req, res) => {
  
  try {
    const voiceNote = await VoiceNote.findById(req.params.id);
    if (!voiceNote) {
      console.log("no encontrado")
      return res.status(404).send('Audio no encontrado');
    }

    res.set({
      'Content-Type': voiceNote.contentType,
      'Content-Length': voiceNote.size,
      'Content-Disposition': `inline; filename="audio-${voiceNote._id}.wav"`
    });
    
    res.send(voiceNote.audioData);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {getVoiceNotes}