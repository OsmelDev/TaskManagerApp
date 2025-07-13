const mongoose = require('mongoose');

const voiceNoteSchema = new mongoose.Schema({
  
  audioData: {
    type: Buffer,
    required: true,
  },

  contentType: {
    type: String,
    required: true,
    enum: ['audio/wav', 'audio/mpeg', 'audio/ogg', 'audio/webm'],
    default: 'audio/wav'
  },

  duration: {
    type: Number, 
    required: true,
    min: 0.1, 
    max: 600 
  },

  size: {
    type: Number,
    required: true,
    validate: {
      validator: function(v) {
        return v <= 15 * 1024 * 1024; 
      },
      message: 'El tamaño del audio no puede exceder 15MB'
    }
  },

  title: {
    type: String,
    trim: true,
    maxlength: 100,
    default: 'Grabación sin título'
  },

  isTranscribed: {
    type: Boolean,
    default: false
  },

  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },

  associatedTask: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  },
  
  associatedTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  }

}, {
  timestamps: true, 
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.audioData;
      return ret;
    }
  }
});

// Virtual para URL de acceso al audio
voiceNoteSchema.virtual('audioUrl').get(function() {
  return `/api/voice-notes/${this._id}/stream`;
});

// // Índices para mejor rendimiento
// voiceNoteSchema.index({ created_by: 1 });
// voiceNoteSchema.index({ associatedTask: 1 });
// voiceNoteSchema.index({ createdAt: -1 });

// Middleware para limpieza antes de borrar
voiceNoteSchema.pre('remove', async function(next) {
  // Aquí puedes agregar lógica para limpiar referencias
  // Por ejemplo, eliminar la referencia en la tarea asociada
  next();
});

module.exports = mongoose.model('VoiceNote', voiceNoteSchema);