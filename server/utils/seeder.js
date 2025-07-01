import mongoose from 'mongoose';
import Aerospace from '../models/Aerospace.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/aerospace-app';

const sampleData = [
  {
    name: "Apollo 11",
    mission: "First manned lunar landing",
    launchDate: new Date("1969-07-16"),
    agency: "NASA",
    description: "Historic mission that landed the first humans on the Moon",
    status: "completed"
  },
  {
    name: "SpaceX Crew Dragon",
    mission: "Commercial crew transportation to ISS",
    launchDate: new Date("2020-05-30"),
    agency: "SpaceX",
    description: "First commercial spacecraft to carry astronauts to the International Space Station",
    status: "completed"
  },
  {
    name: "Perseverance Rover",
    mission: "Mars exploration and sample collection",
    launchDate: new Date("2020-07-30"),
    agency: "NASA",
    description: "Mars rover designed to search for signs of ancient life and collect samples",
    status: "active"
  },
  {
    name: "Artemis I",
    mission: "Uncrewed lunar orbit test flight",
    launchDate: new Date("2022-11-16"),
    agency: "NASA",
    description: "First integrated test of NASA's deep space exploration systems",
    status: "completed"
  },
  {
    name: "James Webb Space Telescope",
    mission: "Deep space observation and exoplanet study",
    launchDate: new Date("2021-12-25"),
    agency: "NASA",
    description: "Most powerful space telescope ever built, studying the universe in infrared",
    status: "active"
  }
];

export const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await Aerospace.deleteMany({});
    console.log('Cleared existing aerospace data');

    // Insert sample data
    const result = await Aerospace.insertMany(sampleData);
    console.log(`Seeded ${result.length} aerospace missions`);

    await mongoose.disconnect();
    console.log('Database seeding completed');
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

// Run seeder if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase();
} 