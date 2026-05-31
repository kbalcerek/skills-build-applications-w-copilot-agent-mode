import dotenv from 'dotenv'
import mongoose from 'mongoose'

import { Activity } from '../models/activity.js'
import { LeaderboardEntry } from '../models/leaderboard.js'
import { Team } from '../models/team.js'
import { User } from '../models/user.js'
import { Workout } from '../models/workout.js'

dotenv.config()

const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db'

const seedDatabase = async () => {
  console.log('Seed the octofit_db database with test data')

  await mongoose.connect(mongoUri)

  await Promise.all([
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({}),
  ])

  const users = await User.create([
    {
      name: 'Maya Chen',
      email: 'maya.chen@example.com',
      role: 'student',
      fitnessLevel: 'intermediate',
    },
    {
      name: 'Jordan Smith',
      email: 'jordan.smith@example.com',
      role: 'student',
      fitnessLevel: 'beginner',
    },
    {
      name: 'Avery Patel',
      email: 'avery.patel@example.com',
      role: 'coach',
      fitnessLevel: 'advanced',
    },
    {
      name: 'Sam Rivera',
      email: 'sam.rivera@example.com',
      role: 'teacher',
      fitnessLevel: 'advanced',
    },
  ])

  const teams = await Team.create([
    {
      name: 'Cardio Crew',
      description: 'A team focused on running, cycling, and weekly endurance goals.',
      members: [users[0]._id, users[1]._id, users[2]._id],
    },
    {
      name: 'Strength Squad',
      description: 'Functional strength training with coach-led workout challenges.',
      members: [users[2]._id, users[3]._id],
    },
  ])

  await Activity.create([
    {
      user: users[0]._id,
      type: 'Run',
      durationMinutes: 34,
      distanceMiles: 3.2,
      caloriesBurned: 360,
      loggedAt: new Date('2026-05-25T14:30:00.000Z'),
    },
    {
      user: users[1]._id,
      type: 'Yoga',
      durationMinutes: 45,
      caloriesBurned: 180,
      loggedAt: new Date('2026-05-26T12:00:00.000Z'),
    },
    {
      user: users[2]._id,
      type: 'Cycling',
      durationMinutes: 62,
      distanceMiles: 15.4,
      caloriesBurned: 620,
      loggedAt: new Date('2026-05-27T21:10:00.000Z'),
    },
    {
      user: users[3]._id,
      type: 'Strength Training',
      durationMinutes: 50,
      caloriesBurned: 410,
      loggedAt: new Date('2026-05-28T16:45:00.000Z'),
    },
  ])

  await LeaderboardEntry.create([
    {
      user: users[2]._id,
      team: teams[0]._id,
      points: 1280,
      rank: 1,
      period: 'weekly',
    },
    {
      user: users[0]._id,
      team: teams[0]._id,
      points: 1125,
      rank: 2,
      period: 'weekly',
    },
    {
      user: users[3]._id,
      team: teams[1]._id,
      points: 980,
      rank: 3,
      period: 'weekly',
    },
    {
      user: users[1]._id,
      team: teams[0]._id,
      points: 745,
      rank: 4,
      period: 'weekly',
    },
  ])

  await Workout.create([
    {
      title: 'Beginner Balance Builder',
      description: 'Low-impact mobility, balance work, and easy cardio intervals for new athletes.',
      fitnessLevel: 'beginner',
      durationMinutes: 30,
      activityTypes: ['Mobility', 'Walking', 'Core'],
    },
    {
      title: 'Lunchtime 5K Prep',
      description: 'Tempo running, strides, and cooldown stretches for students building endurance.',
      fitnessLevel: 'intermediate',
      durationMinutes: 45,
      activityTypes: ['Run', 'Stretching'],
    },
    {
      title: 'Advanced Power Circuit',
      description: 'A high-intensity strength circuit with compound lifts and conditioning finishers.',
      fitnessLevel: 'advanced',
      durationMinutes: 55,
      activityTypes: ['Strength Training', 'HIIT'],
    },
  ])

  console.log('Seeded users, teams, activities, leaderboard entries, and workouts.')
}

seedDatabase()
  .catch((error: unknown) => {
    console.error('Failed to seed octofit_db', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await mongoose.disconnect()
  })