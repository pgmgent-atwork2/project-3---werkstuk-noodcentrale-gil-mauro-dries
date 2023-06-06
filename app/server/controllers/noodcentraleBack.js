import bcrypt from 'bcrypt';
import DataSource from '../lib/DataSource.js';

// * users
export const getUsers = async (req, res) => {
  try {
    const userRepo = DataSource.getRepository('UserMeta');
    const renderUser = await userRepo.find({
      id: req.params.id,
    });
    res.status(200).json(renderUser);
  } catch (e) {
    console.log(e);
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const { id } = req.body;
    const userRepo = DataSource.getRepository('UserMeta');
    await userRepo.remove({ id });
    // res.redirect('/');
    res.status(200).json({ status: 'succeed' });
  } catch (e) {
    console.log(e);
  }
};

// eslint-disable-next-line consistent-return
export const addUser = async (req, res, next) => {
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
        label: req.body.label,
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
        GSM: 'abcd',
        avatar: 'aba',
      },
    });

    // save the user
    await userRepository.save(user);

    // res.redirect('/moet_gebeuren');
    res.status(200).json({ status: 'succeed' });
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
    res.status(200).json({ status: 'succeed' });
  } catch (e) {
    console.log(e);
  }
};

// * recordings
export const getRecordings = async (req, res) => {
  try {
    const userRepo = DataSource.getRepository('Recording');
    const renderRec = await userRepo.find({
      id: req.params.id,
    });
    res.status(200).json(renderRec);
  } catch (e) {
    console.log(e);
  }
};
