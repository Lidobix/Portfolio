import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());

app.listen(1234, () => {
  console.log(`server démarré sur le port 1234`);
});

app.get('/api', (req, res) => {
  console.log('appel api');
  res.send(`réponse du serveur: coucou! :)`);
});
