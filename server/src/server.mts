import express from 'express';
import * as exphbs from 'express-handlebars';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'node:path';
import routes from './routes/index.mjs';

import { fileURLToPath } from 'node:url';
// const __filename = fileURLToPath(import.meta.url)
const __dirname = fileURLToPath(new URL('.', import.meta.url));

export const init = () => {
  const app = express();

  // if you ever use a reverse proxy, you need to enable this. (i.e. AWS ELB, Heroku, etc.)
  app.enable('trust proxy');// enables trust for proxy terminated SSL.

  // basic security headers
  app.use(helmet.dnsPrefetchControl());
  app.use(helmet.frameguard());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.hsts());
  app.use(helmet.ieNoOpen());
  app.use(helmet.noSniff());
  app.use(helmet.permittedCrossDomainPolicies());
  app.use(helmet.referrerPolicy());
  app.use(helmet.xssFilter());

  // eslint-disable-next-line @stylistic/max-statements-per-line
  app.get('/alive', (req, res) => { res.status(200).send('ok'); }); // I use this for health checks. It happens before morgan logging.

  // Set up Handlebars
  app.engine('hbs', exphbs.engine({
    defaultLayout: 'layout',
    extname: '.hbs'
  }));

  app.set('view engine', 'hbs');

  if (process.env.NODE_ENV === 'production') {
    // NOTE production only middlewares
    app.use(morgan('combined'));
  } else {
    // NOTE development only middlewares
    app.use(morgan('dev'));
  }

  // Serve static files
  app.use(express.static(path.join(__dirname, '../../client/public')));
  app.use(express.static(path.join(__dirname, '../../client/dist')));

  app.use(routes);
  return app;
};
