import express, { type Express, type Request, type Response } from 'express';
//import { buildDrizzleClient } from './infrastructure/postgres/client.ts';
//import { getConfig } from './config/config.ts';

const app: Express = express();
const port = process.env.PORT || 3000;

//const config = getConfig();
//const drizzleClient = buildDrizzleClient(config.databaseUrl);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port);
