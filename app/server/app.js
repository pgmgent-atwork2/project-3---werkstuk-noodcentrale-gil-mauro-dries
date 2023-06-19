/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
// import statements
import bodyParser from 'body-parser';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import { create } from 'express-handlebars';
import { fileURLToPath } from 'url';
import qs from 'qs';
import DataSource from './lib/DataSource.js';
import SOURCE_PATH from './constants.js';

//! import backend
import {
  getUsers,
  deleteUsers,
  updateUser,
  addUser,
} from './controllers/noodcentraleBack.js';

//! import frontend
import {
  renderForBrowser,
  addUserForm,
  renderTestAddUser,
  renderMedischDashboard,
  renderNietMedischDashboard,
  renderMedischCollegas,
  renderNietMedischCollegas,
  renderMedischGesprekken,
  renderNietMedischGesprekken,
  putUser,
  renderBeoordeling,
} from './controllers/noodcentraleFront.js';

// login and register imports
import { login, logout, postLogin } from './controllers/authentication.js';

import Authentication from './middleware/validation/Authentication.js';
import { jwtAuth, jwtTokenAuth } from './middleware/jwtAuth.js';
import { updateRole } from './controllers/api/roles.js';
import { isAdmin, isMedische, isNotMedische } from './middleware/roleCheck.js';
import HandlebarsHelpers from './lib/helpers/HandlebarHelpers.js';

// create express app
const app = express();

app.set('query parser', (str) =>
  qs.parse(str, {
    /* custom options */
  })
);

// serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  '/public',
  express.static(path.join(__dirname, '..', 'client', 'assets'))
);

/*
 * import body parser & coockie parser
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//* -------------------------------- HANDLEBARS -------------------------------
const hbs = create({
  helpers: HandlebarsHelpers,
  extname: 'hbs',
  // defaultLayout: "main", // kan in comments
  // layoutsDir: path.resolve("src", "views", "layouts"),  // kan in comments
  // partialsDir: path.resolve("src", "views", "partials"),  // kan in comments
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.resolve(SOURCE_PATH, 'views'));

//! define routes LOGIN

app.get('/login', login);
app.post('/login', Authentication, postLogin, login);
app.post('/logout', logout);

//! define routes BACK-END

app.get('/api/users', getUsers);
app.delete('/api/delUsers', deleteUsers);
app.post('/add-user', addUser);
app.put('/api/putUsers', updateUser);
app.put('/api/roles', jwtTokenAuth, updateRole);

//! define routes FRONT-END
app.get('/admin-add-user', jwtAuth, isAdmin, renderTestAddUser);
app.get('/add-user', addUserForm);
app.post('/add-user', addUser);
app.get('/medisch-dash', jwtAuth, isMedische, renderMedischDashboard);
app.get(
  '/niet-medisch-dash',
  jwtAuth,
  isNotMedische,
  renderNietMedischDashboard
);
app.get('/medisch-collegas', jwtAuth, isMedische, renderMedischCollegas);
app.get('/medisch-gesprekken', jwtAuth, isMedische, renderMedischGesprekken);
app.get(
  '/niet-medisch-collegas',
  jwtAuth,
  isNotMedische,
  renderNietMedischCollegas
);
app.get(
  '/niet-medisch-gesprekken',
  jwtAuth,
  isNotMedische,
  renderNietMedischGesprekken
);
app.get('/form', renderBeoordeling);
app.get('/admin-dash', jwtAuth, isAdmin, renderForBrowser);
app.get('/add-user', jwtAuth, addUserForm);
app.post('/put-user', putUser);

//* -------------------------------- DATA INIT --------------------------------

if (process.env.NODE_ENV !== 'test') {
  DataSource.initialize()
    .then(() => {
      // start the server
      app.listen(process.env.PORT, () => {
        console.log(
          `Application is running on http://localhost:${process.env.PORT}/.`
        );
      });
    })
    .catch((error) => {
      console.log('Error: ', error);
    });
}

export default app;
