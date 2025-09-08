const express = require('express')
const connectDBLocal = require('./db/dbLocal')
const connectDB = require('./db/connectDB.js')
const cors = require('cors') 
const morgan = require('morgan')
const cookieParser = require('cookie-parser') 
const authRoutes = require('./routes/auth.routes.js')
const taskRoutes = require('./routes/task.routes.js')
const teamRoutes = require('./routes/team.routes.js')
const voiceNotesRoutes = require('./routes/voice_notes.routes.js')
const { PORT } = require('./config.js')
 
const app = express()

app.use(cors({
  origin: "http://localhost:4000",
  credentials: true
}))

app.use(morgan('dev')) 
app.use(express.json())
app.use(cookieParser())
app.use("/auth", authRoutes)
app.use("/task", taskRoutes)
app.use("/team", teamRoutes)
app.use("/notes", voiceNotesRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', routes: ['/auth', '/task', '/team', '/notes'] });
});

app.get('/', async (req, res) => {
  try {
    // Verificar estado de MongoDB
    const dbStatus = mongoose.connection.readyState;
    const status = {
      server: 'running',
      database: dbStatus === 1 ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString()
    };
    
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: 'Health check failed' });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en http://localhost:${PORT}`)
  connectDB()
})