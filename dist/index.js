import express from 'express';
import dotenv from 'dotenv';
import allRoutes from './routes/allRoutes.js';
import sequelize from './db/index.js';
import syncTables from './models/syncModels.js';
// import LibraryTable from './models/libraryModel.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use('/', allRoutes);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
const db = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await syncTables();
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
db();
