import express from 'express';
import Aerospace from '../models/Aerospace.js';

const router = express.Router();

// GET all aerospace missions
router.get('/', async (req, res) => {
  try {
    const missions = await Aerospace.find().sort({ launchDate: -1 });
    res.json(missions);
  } catch (error) {
    console.error('Error fetching missions:', error);
    res.status(500).json({ message: 'Error fetching missions' });
  }
});

// GET single mission by ID
router.get('/:id', async (req, res) => {
  try {
    const mission = await Aerospace.findById(req.params.id);
    if (!mission) {
      return res.status(404).json({ message: 'Mission not found' });
    }
    res.json(mission);
  } catch (error) {
    console.error('Error fetching mission:', error);
    res.status(500).json({ message: 'Error fetching mission' });
  }
});

// POST create new mission
router.post('/', async (req, res) => {
  try {
    const newMission = new Aerospace(req.body);
    const savedMission = await newMission.save();
    res.status(201).json(savedMission);
  } catch (error) {
    console.error('Error creating mission:', error);
    res.status(400).json({ message: 'Error creating mission', error: error.message });
  }
});

// PUT update mission
router.put('/:id', async (req, res) => {
  try {
    const updatedMission = await Aerospace.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedMission) {
      return res.status(404).json({ message: 'Mission not found' });
    }
    res.json(updatedMission);
  } catch (error) {
    console.error('Error updating mission:', error);
    res.status(400).json({ message: 'Error updating mission', error: error.message });
  }
});

// DELETE mission
router.delete('/:id', async (req, res) => {
  try {
    const deletedMission = await Aerospace.findByIdAndDelete(req.params.id);
    if (!deletedMission) {
      return res.status(404).json({ message: 'Mission not found' });
    }
    res.json({ message: 'Mission deleted successfully' });
  } catch (error) {
    console.error('Error deleting mission:', error);
    res.status(500).json({ message: 'Error deleting mission' });
  }
});

export default router;
