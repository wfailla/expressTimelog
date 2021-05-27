import { IUser } from "@entities/User";
import { LogEntityPayload } from "src/repositories/timeEntry";

declare module 'express' {
    export interface Request  {
        body: LogEntityPayload;
    }
}
