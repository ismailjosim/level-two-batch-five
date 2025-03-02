/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';
import { Server } from 'http';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    server = app.listen(config.port, () => {
      console.log(`University app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log('Found Error', error);
  }
}
main();

process.on('unhandledRejection', (err) => {
  console.log(`😒 unhandledRejection is detected, Shutting down...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.log(`😒 uncaughtException is detected, Shutting down...`);

  process.exit(1);
});
