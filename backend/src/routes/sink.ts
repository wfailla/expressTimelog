import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import { addActivity } from 'src/repositories/timeEntry';

const { OK } = StatusCodes;

export async function logTime(req: Request, res: Response) {
    const response = await addActivity(req.body);
    return res.status(OK).send(response);
}