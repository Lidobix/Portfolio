import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());

const dbUrl = process.env.DB_URL;
const dbName = process.env.DB_NAME;
const dbCol = process.env.COLLECTION_PROJECTS;
const mongoClient = new MongoClient(dbUrl);

function fetchDatas() {
  return new Promise((resolve, reject) => {
    mongoClient.connect().then(() => {
      mongoClient
        .db(dbName)
        .collection(dbCol)
        .findOne({ title: 'sqware-it' })
        .then((result) => {
          resolve(result);
        });
    });
  });
}

app.get('/api', (req, res) => {
  console.log('appel api');
  fetchDatas().then((projects) => {
    console.log('projects=', projects);
    res.json(projects);
  });
});

app.listen(1234, () => {
  console.log(`server démarré sur le port 1234`);
});
