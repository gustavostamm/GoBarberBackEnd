import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface tokenPayLoad {
    iat: number,
    exp: number,
    sub: string,
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new Error('JWT token is missing');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as tokenPayLoad;

        request.user = {
            id: sub,
        }
        
        return next();

        
    } catch {
        throw new Error('Invalid JWT token');
    }
}