import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Avery Morgan', email: 'avery@example.com', avatar: 'AM' },
      { name: 'Jordan Lee', email: 'jordan@example.com', avatar: 'JL' },
      { name: 'Riley Chen', email: 'riley@example.com', avatar: 'RC' },
    ]);

    await Team.insertMany([
      { name: 'Summit Striders', color: '#2f6fed', members: [users[0]._id, users[1]._id] },
      { name: 'Pulse Collective', color: '#e05d44', members: [users[2]._id] },
    ]);

    await Activity.insertMany([
      { user: users[0]._id, type: 'Run', durationMinutes: 42, calories: 410, completedAt: new Date('2026-09-07T07:30:00Z') },
      { user: users[1]._id, type: 'Strength', durationMinutes: 35, calories: 280, completedAt: new Date('2026-09-06T18:00:00Z') },
      { user: users[2]._id, type: 'Cycling', durationMinutes: 55, calories: 520, completedAt: new Date('2026-09-05T09:15:00Z') },
    ]);

    await Leaderboard.insertMany([
      { user: users[0]._id, points: 1280, rank: 1 },
      { user: users[1]._id, points: 1115, rank: 2 },
      { user: users[2]._id, points: 940, rank: 3 },
    ]);

    await Workout.insertMany([
      {
        title: 'Foundational Strength',
        category: 'Strength',
        difficulty: 'Beginner',
        durationMinutes: 30,
        exercises: ['Goblet squat', 'Push-up', 'Bent-over row', 'Dead bug'],
      },
      {
        title: 'Tempo Run Builder',
        category: 'Cardio',
        difficulty: 'Intermediate',
        durationMinutes: 35,
        exercises: ['Warm-up jog', 'Tempo interval', 'Recovery jog', 'Cool-down'],
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
