import express, { NextFunction, Request, Response } from 'express';
import deviceRoutes from './routes';

const app = express();

app.use(express.json());

app.use('/api/devices', deviceRoutes);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});

export default app;