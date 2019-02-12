#!/usr/bin/env node
import yargs from 'yargs';
import path from 'path';
import fs from 'fs-extra';
import pkg from '../package.json';
import { Server } from './services/server';

const argv = yargs
  .config('config')
  .usage('$0 [options] <source>')
  .options({
    port: {
      alias: 'p',
      description: 'Set port',
      default: 8000
    },
    host: {
      description: 'Set host',
      default: '0.0.0.0'
    }
  })
  .help('help')
  .alias('help', 'h')
  .version(pkg.version)
  .alias('version', 'v')
  .example('$0 db.json', '')
  .require(1, 'Missing <source> argument').argv;

const cwd = process.cwd();
const file = path.resolve(cwd, argv._[0]);

const getFileData = async () => {
  try {
    return JSON.parse((await fs.readFile(file)).toString());
  } catch (e) {
    throw new Error('Could not get file data');
  }
}

const startServer = async () => {
  try {
    const server = new Server(argv.port, argv.host);
    // Bootstrap the server with the data from the file
    const data = await getFileData();
    await server.bootstrap(data);
    // Start the server
    server.start();
    // Watch for changes on the file
    // Reload the server when changes are made.
  } catch (e) {
    throw e;
  }
};

startServer().catch(e => console.error(e));
