import { DatePipe } from "@angular/common";
import { LogEntity } from "./log-entity";

export class TimeString {
    houres: number;
    minutes: number;

    constructor(houres: number,
        minutes: number) {
        this.houres = houres;
        this.minutes = minutes;
    }

    public addTime(otherTime: TimeString): void {
        if (this.minutes + otherTime.minutes > 60) {
            this.minutes += otherTime.minutes - 60;
            this.houres += 1;
        } else {
            this.minutes += otherTime.minutes;
        }
        this.houres += otherTime.houres;
    }

    public toString(): string {
        return this.houres.toString() + " h " + this.minutes.toString() + " min";
    }
}

export class Timestamp {
    private _date!: Date;

    constructor(date: Date) {
        this._date = date;
    }

    public diff(otherTimestamp: Timestamp): string {
        return this.diffTimeString(otherTimestamp).toString();
    }

    public diffTimeString(otherTimestamp: Timestamp): TimeString {
        var houres: number = otherTimestamp._date.getHours() - this._date.getHours();
        var minutes: number = otherTimestamp._date.getMinutes() - this._date.getMinutes();
        if (houres > 0 && minutes < 0) {
            houres -= 1;
            minutes = minutes + 60;
        }
        return new TimeString(houres, minutes);
    }

    public static calcWorkTime(list: LogEntity[]): string {
        var timeString = new TimeString(0, 0);
        var firstTimestamp: Timestamp = new Timestamp(new Date(list[0].timestamp));
        list.forEach(s => {
            var currentTimestamp = new Timestamp(new Date(s.timestamp));
            if (!s.activity.includes("**")) {
                timeString.addTime(firstTimestamp.diffTimeString(currentTimestamp))
            }
            firstTimestamp = currentTimestamp;
        })
        return timeString.toString();
    }

    public static calculateSlackingTime(list: LogEntity[]): string {
        var timeString = new TimeString(0, 0);
        var firstTimestamp: Timestamp = new Timestamp(new Date(list[0].timestamp));
        list.forEach(s => {
            var currentTimestamp = new Timestamp(new Date(s.timestamp));
            if (s.activity.includes("**")) {
                timeString.addTime(firstTimestamp.diffTimeString(currentTimestamp))
            }
            firstTimestamp = currentTimestamp;
        })
        return timeString.toString();
    }

    public static calcTimeByGroup(list: LogEntity[], group: string): Map<string, TimeString> {
        var timeString = new TimeString(0, 0);
        var groups = new Map<string, TimeString>();
        var lastTimestamp: Timestamp = new Timestamp(new Date(list[0].timestamp));


        list.forEach(s => {
            var group: string = 'other';
            var currentTimestamp = new Timestamp(new Date(s.timestamp));

            if (s.activity.includes(':')) {
                group = s.activity.split(':')[0];
            }
            if (groups.get(group) === undefined) {
                groups.set(
                    group,
                    lastTimestamp.diffTimeString(currentTimestamp)
                );
            } else {
                groups.get(group)?.addTime(
                    lastTimestamp.diffTimeString(currentTimestamp));
            }

            lastTimestamp = currentTimestamp;
        })

        return groups;
    }

    public get date(): Date {
        return this._date;
    }
    public set date(value: Date) {
        this._date = value;
    }

    public toString(): string {
        return new DatePipe("en-US").transform(this._date, 'yyyy-MM-dd HH:mm') || '';
    }
}
