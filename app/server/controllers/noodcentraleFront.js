/**
 * An authentication Controller
 */

import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import DataSource from '../lib/DataSource.js';

// eslint-disable-next-line consistent-return
export const addUser = async (req, res, next) => {
  try {
    // make user repository instance
    const userRepository = await DataSource.getRepository('User');
    const roleRepository = await DataSource.getRepository('Role');

    const userExists = await userRepository.findOne({
      where: {
        email: req.body.email,
      },
    });

    const role = await roleRepository.findOne({
      where: {
        label: req.body.role,
      },
    });

    if (!role) {
      console.log('Role not found');
      req.formErrors = [{ message: 'Rol bestaat niet.' }];
      return next();
    }

    if (userExists) {
      console.log('User already exists');
      req.formErrors = [{ message: 'Gebruiker bestaat al.' }];
      return next();
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    // create a new user
    const user = await userRepository.create({
      email: req.body.email,
      password: hashedPassword,
      role,
      meta: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: 'abcd',
        avatar: 'aba',
      },
    });

    // save the user
    await userRepository.save(user);

    res.redirect('/moet_gebeuren');
  } catch (e) {
    console.log(e.message);
    next(e.message);
  }
};

export const renderForBrowser = async (req, res) => {};

export const addUserForm = async (req, res) => {
  res.render('test-form', {});
};
export const renderTestDashboard = async (req, res) => {
  res.render('layouts/adminDashboard');
};
export const renderTestAddUser = async (req, res) => {
  res.render('layouts/adminAddUser');
};
