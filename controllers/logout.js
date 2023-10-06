import User from '../models/User.js';

export const logout = (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.redirect('/dashboard');
      }
      res.redirect('/login');
    });
  }