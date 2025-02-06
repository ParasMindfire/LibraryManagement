import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || 'my_library',
  process.env.MYSQL_USER || 'root',
  process.env.MYSQL_PASSWORD || '', 
  {
    host: process.env.MYSQL_HOST || '127.0.0.1',
    dialect:'mysql',
  }
);


export default sequelize;
