import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

const { BAD_REQUEST, CREATED, OK } = StatusCodes;

export async function logTime(req: Request, res: Response) {
    return res.status(OK).end();
}