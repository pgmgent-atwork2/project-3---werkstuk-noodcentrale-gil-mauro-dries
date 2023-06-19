/**
 * An authentication Controller
 */

import bcrypt from 'bcrypt';
import DataSource from '../lib/DataSource.js';

export const renderForBrowser = async (req, res) => {
  try {
    const { roleId } = req.query;
    console.log('rreqssss', req.query);
    const roleRepo = DataSource.getRepository('Role');
    const findRole = await roleRepo.findOne({
      where: {
        id: roleId,
      },
    });

    const userRepo = DataSource.getRepository('User');
    const findUsers = await userRepo.find({
      relations: ['meta', 'role'],
      where: {
        role: findRole,
      },
    });

    const { token } = req.cookies;

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
    console.log(req.body);
    // create a new user
    const user = await userRepository.create({
      email: req.body.email,
      password: hashedPassword,
      role: {
        id: req.body.role,
      },
      meta: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        GSM: '0460977802',
        // avatar: 'aba',
      },
    });

    // save the user
    const answer = await userRepository.insert(user);
    console.log('test', answer);
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

export const putUser = async (req, res) => {
  try {
    const userRepo = DataSource.getRepository('User');
    const { id, firstname, lastname, email, GSM } = req.body;
    console.log(req.body);
    const userUpdate = await userRepo.findOne({
      relations: ['meta'],
      where: {
        id,
      },
    });

    console.log('i approve this meta req:', req.body);
    await console.log('i approve this meta:', userUpdate);

    userUpdate.meta.firstname = firstname;
    userUpdate.meta.lastname = lastname;
    userUpdate.email = email;
    userUpdate.meta.GSM = GSM;
    await userRepo.save(userUpdate);
    res.redirect('/admin-dash');
  } catch (e) {
    console.log(e);
  }
};

export const renderTestAddUser = async (req, res) => {
  res.render('layouts/adminAddUser');
};

export const renderMedischDashboard = async (req, res) => {
  try {
    const userRepo = DataSource.getRepository('User');
    const { id } = req.user;
    const findUser = await userRepo.findOne({
      relations: ['meta', 'role'],
      where: {
        id,
      },
    });

    console.log(req.user);
    console.log('renderMedischDashboard', findUser);

    res.render('layouts/medischDashboard', {
      findUser,
    });
  } catch (e) {
    console.error(e);
  }
};
export const renderNietMedischDashboard = async (req, res) => {
  res.render('layouts/nietMedischDashboard');
};

export const renderCollegas = async (req, res) => {
  res.render('layouts/collega');
};

export const renderGesprekken = async (req, res) => {
  res.render('layouts/gesprekken');
};

export const renderBeoordeling = async (req, res) => {
  res.render('layouts/form');
};
