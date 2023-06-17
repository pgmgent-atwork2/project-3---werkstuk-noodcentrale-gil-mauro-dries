export const isAdmin = async (req, res, next) => {
  const { user } = req.user;
  console.log("req.user:", res.user);

  // if (user === 1) {
  //   res.redirect('/admin-dash');
  // } else {
  //   return res.json({ status: 404, statusText: 'Not Allowed' });
  // }

  try {
    return next();
  } catch (e) {
    res.clearCookie('token');
    return res.redirect('/login');
  }
};
