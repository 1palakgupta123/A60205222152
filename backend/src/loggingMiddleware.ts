
import { Request, Response, NextFunction } from 'express';
import { writeLog } from './storage';

export function loggingMiddleware(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  res.on('finish', () => {
    writeLog({
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      durationMs: Date.now() - start,
      clientIp: req.ip,
    });
  });
  next();
}
