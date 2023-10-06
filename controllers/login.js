import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const getLogin = (req, res) => {
  res.render('login', { title: 'Connexion' }); 
}

export const postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const errorMessage = 'Email ou mot de passe incorrect';
      req.flash('error', errorMessage); 
      return res.render('login', { 
        title: 'Connexion',
        email: email,
        error: errorMessage
      });      
    }

    req.session.userId = user._id;
    req.flash('sucess', 'Connection établis'); 
    res.redirect('/dashboard');

  } catch (error) {
    const errorMessage = 'Une erreur s\'est produite lors de la connexion';
    req.flash('error', errorMessage);
    res.render('login', { 
      title: 'Connexion',
      email: email,
      error: errorMessage
    });    
  }
}
