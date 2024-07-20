import { init as initApp } from '../server.mjs';
import http from 'node:http';

const start = async () => {
  // NOTE: Add your startup config code here
  const app = initApp();

  app.set('port', process.env.PORT ?? 3000);

  // HTTP server
  const serverHttp = http.createServer(app);
  serverHttp.on('error', function (err: Error) {
    console.error(err);
  });
  serverHttp.listen(app.get('port'), function () {
    console.log(`Server running on port ${app.get('port')}`);
  });
};

start()
  .catch((err) => { console.error(err); });
