/* eslint-disable import/no-extraneous-dependencies */
// import statements
import bodyParser from 'body-parser';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import { create } from 'express-handlebars';
import DataSource from './lib/DataSource.js';
import SOURCE_PATH from './constants.js';

//! import frontend
import { renderForBrowser } from './controllers/noodcentraleFront.js';

// login and register imports
import { login, logout } from './controllers/authentication.js';

import Authentication from './middleware/validation/Authentication.js';
import { jwtAuth } from './middleware/jwtAuth.js';

// create express app
const app = express();

// serve static files
app.use(express.static('public'));

/*
 * import body parser & coockie parser
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//* -------------------------------- HANDLEBARS -------------------------------
const hbs = create({
  // helpers: handlebarsHelpers,
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
app.post('/logout', logout);

//! define routes FRONT-END

app.get('/', renderForBrowser);

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
