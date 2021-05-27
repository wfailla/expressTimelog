import './pre-start'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';
import "reflect-metadata";
import { createConnection } from 'typeorm';
import dbConfig from './config/db';


// Start the server
const port = Number(process.env.PORT || 3000);
// app.listen(port, () => {
//     logger.info('Express server started on port: ' + port);
// });


// init db connection
createConnection(dbConfig)
  .then((_connection) => {
    app.listen(port, () => {
        logger.info("Server is running on port" +port);
    });
  })
  .catch((err) => {
    logger.info("Unable to connect to db", err);
    process.exit(1);
  });
