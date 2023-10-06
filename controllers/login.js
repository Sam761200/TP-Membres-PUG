import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const getLogin = (req, res) => {
  res.render('login', { title: 'Connexion' }); // Assurez-vous de créer une vue 'login.pug'
}

export const postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      
      return res.render('login', { error: 'Email ou mot de passe incorrect' });
    }

    req.session.userId = user._id;

    res.redirect('/dashboard');

  } catch (error) {
    res.render('login', { error: 'Une erreur s\'est produite lors de la connexion' });
  }
}