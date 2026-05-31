import { Schema, model } from 'mongoose'

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, default: 0, min: 0 },
    rank: { type: Number, min: 1 },
    period: { type: String, default: 'weekly', trim: true },
  },
  { timestamps: true },
)

export const LeaderboardEntry = model('LeaderboardEntry', leaderboardSchema)