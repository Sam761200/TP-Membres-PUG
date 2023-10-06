import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const getDashboard = async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }

  try {
    const user = await User.findById(req.session.userId);
    
    if (!user) {
      return res.redirect('/login');
    }
  
    res.render('dashboard', { 
      title: 'Tableau de Bord',
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    res.redirect('/login');
  }
}





