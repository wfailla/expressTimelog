import { LogEntity } from "src/models/timeEntry";
import { getRepository } from "typeorm";

export interface LogEntityPayload {
    timestamp: string;
    activity: string;
}

export const getAll = async (): Promise<Array<LogEntity>> => {
    const logEntityRepository = getRepository(LogEntity);
    logEntityRepository.find().then( (o) => {
        console.log(o);
    })
    return logEntityRepository.find();
}

export const addActivity = async (payload: LogEntityPayload): Promise<LogEntity> => {
    const logEntityRepository = getRepository(LogEntity);
    return logEntityRepository.save(payload);
}