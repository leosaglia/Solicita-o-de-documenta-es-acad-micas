import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
// Uma forma de converter uma função que utiliza callback, em algo assinc
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization; // Bearer + token

    if (!authHeader) {
        return response.status(401).json({ error: 'Token not provided' });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);

        request.userId = decoded.id;

        return next();
    } catch (err) {
        return response.status(401).json({ error: 'Token invalid' });
    }
};
