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

app.listen(1234, () => {
  console.log(`server démarré sur le port 1234`);
});

const fetchDatas = async () => {
  try {
    await mongoClient.connect();
    await mongoClient
      .db(dbName)
      .collection(dbCol)
      .findOne({ title: 'sqware-it' })
      .then((r) => {
        console.log(r);
      });
  } finally {
    mongoClient.close();
  }
};

app.get('/api', (req, res) => {
  const projects = fetchDatas();
  res.json(projects);
  // mongoClient.connect();

  //   (err, client) => {
  //   const db = client.db(dbName);
  //   const collection = db.collection(dbCol);
  //   collection.findOne({ title: 'sqware-it' }, (err, result) => {
  //     if (err) {
  //       res.json(err);
  //     } else {
  //       res.json(result);
  //     }
  //   });
  // }

  console.log('appel api');
  // res.send(`réponse du serveur: coucou! :)`);
});
