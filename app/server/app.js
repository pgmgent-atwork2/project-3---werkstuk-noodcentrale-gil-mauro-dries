/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
// import statements
import bodyParser from 'body-parser';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import { create } from 'express-handlebars';
import { fileURLToPath } from 'url';
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
  renderTestMedischDashboard,
  renderTestNietMedischDashboard,
  renderTestCollegas,
  renderTestGesprekken,
  renderTestBeoordeling,
} from './controllers/noodcentraleFront.js';

// login and register imports
import { login, logout, postLogin } from './controllers/authentication.js';

import Authentication from './middleware/validation/Authentication.js';
import { jwtAuth, jwtTokenAuth } from './middleware/jwtAuth.js';
import { updateRole } from './controllers/api/roles.js';
import { isAdmin } from './middleware/roleCheck.js';
import HandlebarsHelpers from './lib/helpers/HandlebarHelpers.js';

// create express app
const app = express();

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

app.get('/adminAddUser', renderTestAddUser);
app.get('/add-user', addUserForm);
app.post('/add-user', addUser);
app.get('/adminAddUser', renderTestAddUser);
app.get('/medischdash', renderTestMedischDashboard);
app.get('/nietmedischdash', renderTestNietMedischDashboard);
app.get('/collega', renderTestCollegas);
app.get('/gesprekken', renderTestGesprekken);
app.get('/form', renderTestBeoordeling);
app.get('/admin-dash', jwtAuth, isAdmin, renderForBrowser);
app.get('/add-user', jwtAuth, addUserForm);

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
