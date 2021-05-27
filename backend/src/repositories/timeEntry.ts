import { LogEntity } from "src/models/timeEntry";
import { getRepository } from "typeorm";

export interface LogEntityPayload {
    timestamp: string;
    activity: string;
}

export const getAll = async (day: string): Promise<Array<LogEntity>> => {
    const logEntityRepository = getRepository(LogEntity);
    return (await logEntityRepository.find()).filter( o => o.timestamp.includes(day));
}

export const addActivity = async (payload: LogEntityPayload): Promise<LogEntity> => {
    const logEntityRepository = getRepository(LogEntity);
    return logEntityRepository.save(payload);
}