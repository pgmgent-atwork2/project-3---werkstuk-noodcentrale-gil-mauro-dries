
export const isAdmin = async (req, res, next) => {
  const { user } = req.user;

  try {
    console.log('we here tea', user);
    return next();
  } catch (e) {
    res.clearCookie('token');
    return res.redirect('/login');
  }
};
