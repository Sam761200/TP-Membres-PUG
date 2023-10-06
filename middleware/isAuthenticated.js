export const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
      return next();
    }
    return res.redirect('/login');
  };
  