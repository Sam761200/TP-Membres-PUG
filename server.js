import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import route from './routes/routes.js';
import { dbConnection } from './models/User.js';

// ==========
// App initialization
// ==========

dotenv.config();
const { APP_HOSTNAME, APP_PORT, NODE_ENV, SESSION_SECRET, MONGO_URI } = process.env;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.set('view engine', 'pug');
app.locals.pretty = NODE_ENV !== 'production'; // Indente correctement le HTML envoyé au client (utile en dev, mais inutile en production)

// ==========
// App middlewares
// ==========
app.use(session({
  secret:SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ==========
// App routers
// ==========

app.use('/', route);

// ==========
// App start
// ==========

await dbConnection();

app.listen(APP_PORT, () => {
  console.log(`App listening at http://${APP_HOSTNAME}:${APP_PORT}`);
});
