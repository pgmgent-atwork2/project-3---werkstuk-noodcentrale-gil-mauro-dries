// import path from 'path';
// import fs from 'fs';
// import DataSource from '../lib/DataSource.js';
// import { PUBLIC_PATH, BASE_URL } from '../views/constants.js';

export const renderTestDashboard = async (req, res) => {
  res.render('layouts/adminDashboard');
};
export const renderTestAddUser = async (req, res) => {
  res.render('layouts/adminAddUser');
};