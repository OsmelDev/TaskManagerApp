const express = require('express');
const { getVoiceNotes } = require('../controllers/voice_notes.controller');
const router = express.Router()

router.get('/voice-notes/:id', getVoiceNotes);

module.exports = router