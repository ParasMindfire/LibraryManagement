import express from 'express';
import {Express} from 'express';
import dotenv from 'dotenv';
import router from './routes/index.js';
import sequelize from './db/index.js';
import syncTables from './models/syncModels.js';
import swaggerDocs from './helpers/swaggerConfig.js';
import { errorHandler } from './middlewares/errorHandler.js';
import notFound from './middlewares/notFound.js';


dotenv.config();

const app:Express= express();
const port = process.env.PORT || 3000;


app.use(express.json());

swaggerDocs(app);

app.use('/', router);

app.use(notFound);
app.use(errorHandler as express.ErrorRequestHandler);






app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


const db=async()=>{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await syncTables();

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

db();





