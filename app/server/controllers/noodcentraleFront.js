/**
 * An authentication Controller
 */

import bcrypt from 'bcrypt';
import DataSource from '../lib/DataSource.js';

export const renderForBrowser = async (req, res) => {
  try {
    console.log('this user is found in req', req.user);
    const userRepo = DataSource.getRepository('User');
    const findUsers = await userRepo.find({
      relations: ['meta', 'role'],
    });

    const { token } = req.cookies;
    console.log('fjfhfghjfjfhjghgjjggj', findUsers);

    return res.render('layouts/adminDashboard', {
      user: req.user,
      findUsers,
      jwtToken: token,
    });
  } catch (e) {
    console.log(e.message);
  }
};

export const addUserForm = async (req, res, next) => {
  // res.send('test ;');
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

    console.log(req.body.username);

    if (!role) {
      console.log('Role not found');
      req.formErrors = [{ message: 'Rol bestaat niet.' }];
      return next();
    }

    if (userExists) {
      console.log('User already exists');
      res.json({ message: 'Gebruiker bestaat al' });
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
        GSM: '0460977802',
        avatar: 'aba',
      },
    });

    // save the user
    await userRepository.save(user);

    res.redirect('/admin-dash');
  } catch (e) {
    console.log(e.message);
    next(e.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    const userRepo = DataSource.getRepository('UserMeta');
    const { id, firstname, lastname, username, avatar } = req.body;
    const userUpdate = await userRepo.findOne({
      where: {
        id,
      },
    });
    userUpdate.firstname = firstname;
    userUpdate.lastname = lastname;
    userUpdate.username = username;
    userUpdate.avatar = avatar;
    await userRepo.save(userUpdate);
    // res.redirect('/');
    res.render('layouts/adminAddUser');
  } catch (e) {
    console.log(e);
  }
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

export const renderTestGesprekken = async (req, res) => {
  res.render('layouts/gesprekken');
};