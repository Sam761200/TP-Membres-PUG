import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const getRegister = (req, res) => {
    res.render('home', { title: 'Inscription' });
  }
  
  export const postRegister = async (req, res) => {
  
    const { firstName, lastName, email, password, password_confirm } = req.body;

    if (!firstName || !lastName || !email || !password || !password_confirm) {
      return res.render('home', { 
        error: 'Tous les champs doivent être remplis',
        firstName: firstName,
        lastName: lastName,
        email: email
      });
    }
    
  
    if (password !== password_confirm) {
      return res.render('home', { 
        error: 'Les mots de passe ne correspondent pas',
        firstName: firstName,
        lastName: lastName,
        email: email
      });
    }
    
  
    try {
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.render('home', { 
          error: 'L\'email existe déjà',
          firstName: firstName,
          lastName: lastName,
          email: email
        });
      }      
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
  
      await user.save();
  
      res.redirect('/login');
  
    } catch (error) {
      res.render('home', { 
        error: 'Une erreur s\'est produite',
        firstName: firstName,
        lastName: lastName,
        email: email
      });
    }
    
  }
  