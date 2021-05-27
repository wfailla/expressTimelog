import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import { getAll } from 'src/repositories/timeEntry';

const { OK } = StatusCodes;

export async function getLog(req: Request, res: Response) {
    console.log("getting it all");
    const response = await getAll();
    return res.status(OK).send(response);
}