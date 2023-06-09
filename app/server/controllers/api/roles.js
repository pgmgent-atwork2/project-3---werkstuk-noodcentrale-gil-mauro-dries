import DataSource from '../../lib/DataSource.js';

export const updateRole = async (req, res) => {
  const { role, id } = req.body;

  const userRepository = DataSource.getRepository('User');
  let userEnt = await userRepository.findOne({
    where: {
      id: id,
    },
    relations: ['role'],
  });

  userEnt = await userRepository.update(userEnt, {
    role: {
      id: role,
    },
  });

  console.log(userEnt);
};
