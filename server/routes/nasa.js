import express from 'express';
import aerospaceData from '../data/aerospace.js';

const router = express.Router();

router.get('/', (req, res) => {
  console.log('GET /api/nasa hit');
  res.json(aerospaceData);
});

export default router;
