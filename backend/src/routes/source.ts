import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import { getAll } from 'src/repositories/timeEntry';

const { OK } = StatusCodes;

export async function getLog(req: Request, res: Response) {
    console.log("getting it all");
    var day: any = req.query.day;
    const response = await getAll(day);
    return res.status(OK).send(response);
}