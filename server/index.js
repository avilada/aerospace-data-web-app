import express from 'express';
import cors from 'cors';
import nasaRoutes from './routes/nasa.js';

const app = express();
const PORT = 0; //Add port

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/nasa', nasaRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
