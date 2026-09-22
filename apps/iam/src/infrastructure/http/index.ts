import express, { type Express, type NextFunction, type Request, type Response } from 'express';
import { getConfig } from '@/config/config.js';
import { buildDrizzleClient } from '@/infrastructure/postgres/client.js';
import { DrizzleUserRepository } from '@/infrastructure/postgres/user-repository.js';
import { RegisterUserUseCase } from '@/application/use-cases/register-user/register-user.use-case.js';

const config = getConfig();
const { db } = buildDrizzleClient(config.databaseUrl);

const userRepository = new DrizzleUserRepository(db);
const registerUserUseCase = new RegisterUserUseCase(userRepository);

const app: Express = express();
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

app.post('/users', (req: Request, res: Response, next: NextFunction) => {
  registerUserUseCase
    .execute(req.body)
    .then((user) => res.status(201).json(user))
    .catch(next);
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(400).json({ code: 'code' in err ? err.code : 'BAD_REQUEST', message: err.message });
});

const port = process.env.PORT || 3003;
app.listen(port);
