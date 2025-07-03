const express = require('express')
const connectDBLocal = require('./db/dbLocal')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes.js')
const taskRoutes = require('./routes/task.routes.js')
const teamRoutes = require('./routes/team.routes.js')

const app = express()
const PORT = 3000

app.use(express.json())
app.use(cookieParser())
app.use(cors({ 
  origin: "http://localhost:4000",
  credentials: true
}))

app.use("/auth", authRoutes)
app.use("/task", taskRoutes)
app.use("/team", teamRoutes)

app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en http://localhost:${PORT}`)
  connectDBLocal() 
})