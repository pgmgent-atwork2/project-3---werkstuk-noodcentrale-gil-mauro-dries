import { DataSource } from 'typeorm';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as dotenv from 'dotenv';

// import van de navigation item entity
import entities from '../models/index.js';

dotenv.config();

const DS = new DataSource({
  type: process.env.DATABASE_TYPE,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  entities,
});
export default DS;
