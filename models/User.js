import mongoose from 'mongoose';

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); 
    console.log('✔️ Connecté à la base MongoDB');
  } catch (err) {
    console.error('Erreur de connexion', err.message);
  }
};

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

export default User;
