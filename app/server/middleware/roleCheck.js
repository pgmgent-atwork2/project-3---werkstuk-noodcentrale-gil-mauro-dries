
export const isAdmin = async (req, res, next) => {
  const { user } = req.user;

  try {
    return next();
  } catch (e) {
    res.clearCookie('token');
    return res.redirect('/login');
  }
};
