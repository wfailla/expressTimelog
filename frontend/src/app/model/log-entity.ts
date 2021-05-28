import { Timestamp } from "./timestamp";

export interface LogEntity {
    id?: number;
    timestamp: string;
    activity: string;
}

export interface LogEntityRow {
    abstime: string;
    timestamp: string;
    activity: string;
}