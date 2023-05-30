import DataSource from '../lib/DataSource.js';
import UserMeta from '../models/UserMeta.js';

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
