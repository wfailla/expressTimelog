import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

const { OK } = StatusCodes;

export async function getLog(req: Request, res: Response) {
    return res.status(OK).end();
}