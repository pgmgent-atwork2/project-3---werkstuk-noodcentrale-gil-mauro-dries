export const isAdmin = async (req, res, next) => {
  const { role } = req.user;
  console.log('req.user:', req.user);

  if (role.id === 1) {
    return next(); // Ga verder naar de volgende middleware of route-handler
  }

  return res.render('layouts/notAllowed');
};

export const isMedische = async (req, res, next) => {
  const { role } = req.user;
  console.log('req.user:', req.user);

  if (role.id === 2) {
    return next(); // Ga verder naar de volgende middleware of route-handler
  }

  return res.render('layouts/notAllowed');
};

export const isNotMedische = async (req, res, next) => {
  const { role } = req.user;
  console.log('req.user:', req.user);

  if (role.id === 3 || role.id === 4 || role.id === 5) {
    return next(); // Ga verder naar de volgende middleware of route-handler
  }

  return res.render('layouts/notAllowed');
};
