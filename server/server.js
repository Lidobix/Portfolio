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
    mongoClient
      .connect()
      .then(() => {
        return mongoClient.db(dbName).collection(dbCol).find({}).toArray();
      })
      .then((r) => {
        resolve(r);
      })
      .catch((reason) => {
        reject(reason);
      });
  });
}
app.get('/', (req, res) => {
  res.json('Le serveur dit coucou!');
});

app.get('/api', (req, res) => {
  fetchDatas().then((datas) => {
    console.log('projects=', datas);
    res.send(datas);
  });
});

app.listen(1234, () => {
  console.log(`server démarré sur le port 1234`);
});
