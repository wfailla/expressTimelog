import { Timestamp } from "./timestamp";

export interface LogEntity {
    id?: number;
    timestamp: string;
    activity: string;
}

export interface LogEntityRow {
    timestamp: Timestamp;
    activity: string;
}