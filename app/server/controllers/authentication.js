import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import DataSource from '../lib/DataSource.js';

export const postRegister = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorFields = {};
      errors.array().forEach((error) => {
        errorFields[error.param] = error.msg;
      });
      req.formErrorFields = errorFields;
      return next();
    }

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
      req.formErrors = [{ message: 'Rol bestaat niet.' }];
      return next();
    }

    if (userExists) {
      req.formErrors = [{ message: 'Gebruiker bestaat al.' }];
      return next();
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const user = await userRepository.create({
      email: req.body.email,
      password: hashedPassword,
      role,
    });

    await userRepository.save(user);

    res.redirect('/moet_gebeuren');
  } catch (e) {
    next(e);
  }
};

export const login = async (req, res) => {
  const { formErrors } = req;

  const inputs = [
    {
      name: 'email',
      label: 'E-mail',
      type: 'text',
      value: req.body?.email ? req.body.email : '',
      error: req.formErrorFields?.email ? req.formErrorFields.email : null,
      placeholder: 'Evelien.rutseart@arteveldehs.be',
    },
    {
      name: 'password',
      label: 'Wachtwoord',
      type: 'password',
      value: req.body?.password ? req.body.password : '',
      error: req.formErrorFields?.password
        ? req.formErrorFields.password
        : null,
      placeholder: '*****',
    },
  ];
  res.render('login', {
    layout: 'authentication',
    inputs,
    formErrors,
  });
};

export const postLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorFields = {};
      errors.array().forEach((error) => {
        errorFields[error.param] = error.msg;
      });
      req.formErrorFields = errorFields;
      return next();
    }

    const userRepository = await DataSource.getRepository('User');
    const lwEmail = req.body.email.toLowerCase();

    const user = await userRepository.findOne({
      where: {
        email: lwEmail,
      },
      relations: ['role'],
    });

    if (!user) {
      req.formErrors = [{ message: 'Gebruiker bestaat niet.' }];
      return next();
    }

    const givenPassword = req.body.password;
    const dbPassword = user.password;
    const isAMatch = bcrypt.compareSync(givenPassword, dbPassword);

    if (!isAMatch) {
      req.formErrors = [{ message: 'Wachtwoord is niet correct.' }];
      return next();
    }

    const token = jwt.sign(
      { id: user.id, email: req.body.email },
      process.env.TOKEN_SALT,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, { httpOnly: true });

    if (user.role.id === 1) {
      console.log('redirecting to admin dash');
      res.redirect('/admin-dash');
    } else if (user.role.id === 2) {
      res.redirect('/medisch-dash');
    } else {
      res.redirect('/niet-medisch-dash');
    }
  } catch (e) {
    next(e);
  }
};

export const logout = async (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
};
