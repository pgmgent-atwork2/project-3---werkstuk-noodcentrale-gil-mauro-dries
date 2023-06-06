/**
 * An authentication Controller
 */

import { validationResult } from 'express-validator';
import DataSource from '../lib/DataSource.js';

export const renderForBrowser = async (req, res) => {
  try {
    const userRepo = DataSource.getRepository('UserMeta');

    const findUser = userRepo.find();

    // Return JSON als we geen cookie hebben, anders returnen we gewoon de view hieronder.
    if (!req.user) {
      return res.json(findUser);
    }
    const userRole = req.user.role.label;
    console.log(userRole);
    if (userRole === 'admin') {
      res.render('adminDashboard', {
        user: req.user,
        findUser,
      });
      return;
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const addUserForm = async (req, res) => {
  res.render('partials/form-add-medewerker', {});
};

export const renderTestDashboard = async (req, res) => {
  res.render('layouts/adminDashboard');
};

export const renderTestAddUser = async (req, res) => {
  res.render('layouts/adminAddUser');
};
export const renderTestMedischDashboard = async (req, res) => {
  res.render('layouts/medischDashboard');
};

export const renderTestNietMedischDashboard = async (req, res) => {
  res.render('layouts/nietMedischDashboard');
};

export const renderTestCollegas = async (req, res) => {
  res.render('layouts/collega');
};
