import express, { response } from 'express';
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
        resolve(mongoClient.db(dbName).collection(dbCol).find({}).toArray());
      })
      .catch((error) => {
        reject(error);
      });
  });
}
app.get('/', (req, res) => {
  res.json('coucou depuis le serveur!');
});

app.get('/api', (req, res) => {
  fetchDatas().then((datas) => {
    console.log('projects=', datas);
    res.send({
      siteElements: datas.filter((data) => data.type === 'element'),
      projects: datas.filter((data) => data.type === 'project'),
    });
  });
});

app.listen(1234, () => {
  console.log(`server démarré sur le port 1234`);
});
