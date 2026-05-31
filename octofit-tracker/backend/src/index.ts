import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

import { Activity } from './models/activity.js'
import { LeaderboardEntry } from './models/leaderboard.js'
import { Team } from './models/team.js'
import { User } from './models/user.js'
import { Workout } from './models/workout.js'
import { createResourceRoute } from './routes/resourceRoute.js'

dotenv.config()

const app = express()
const port = Number(process.env.PORT ?? 8000)
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db'
const codespaceName = process.env.CODESPACE_NAME
const baseUrl = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : `http://localhost:${port}`

app.use(cors())
app.use(express.json())

app.get('/api', (_request, response) => {
  response.json({
    name: 'OctoFit Tracker API',
    baseUrl,
    routes: ['/api/users/', '/api/teams/', '/api/activities/', '/api/leaderboard/', '/api/workouts/'],
  })
})

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    baseUrl,
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  })
})

app.use('/api/users', createResourceRoute(User))
app.use('/api/teams', createResourceRoute(Team))
app.use('/api/activities', createResourceRoute(Activity))
app.use('/api/leaderboard', createResourceRoute(LeaderboardEntry))
app.use('/api/workouts', createResourceRoute(Workout))

app.use((error: Error, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  response.status(500).json({
    error: error.message,
  })
})

const startServer = async () => {
  try {
    await mongoose.connect(mongoUri)
    app.listen(port, () => {
      console.log(`OctoFit backend listening on port ${port}`)
    })
  } catch (error) {
    console.error('Failed to connect to MongoDB', error)
    process.exit(1)
  }
}

void startServer()