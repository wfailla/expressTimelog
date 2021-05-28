import { DatePipe } from "@angular/common";

export class Timestamp {
    private _date!: Date;

    constructor(date: Date) {
        this._date = date;
    }

    public diff(otherTimestamp: Timestamp): string {
        var houres: number = otherTimestamp._date.getHours() - this._date.getHours();
        var minutes: number = otherTimestamp._date.getMinutes() - this._date.getMinutes();
        console.log(this._date.getHours())
        return houres.toString() + " h " + minutes.toString() + " min";
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
