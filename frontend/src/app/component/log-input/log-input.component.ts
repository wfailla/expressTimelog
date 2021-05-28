import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LogEntity } from 'src/app/model/log-entity';
import { BackendService } from 'src/app/service/backend.service';
import { DatePipe } from '@angular/common';
import { interval } from 'rxjs';
import { Timestamp } from 'src/app/model/timestamp';

@Component({
  selector: 'app-log-input',
  templateUrl: './log-input.component.html',
  styleUrls: ['./log-input.component.css']
})
export class LogInputComponent implements OnInit {
  activityFormControl = new FormControl('', []);
  timestamp: string = "";
  currentDiff: string = "";
  day: Date = new Date(Date.now());
  lastTimestamp: Timestamp = new Timestamp(new Date());;

  constructor(
    private backend: BackendService,
    private datepipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.backend.getLogEntries(this.datepipe.transform(this.day, 'yyyy-MM-dd') || '').subscribe(
      s => {
        this.lastTimestamp = new Timestamp(new Date(s[s.length - 1].timestamp));
        this.timestamp = this.datepipe.transform(this.lastTimestamp.date, 'yyyy-MM-dd HH:mm') || '';
        this.calcActivityTime();
      }
    )
    interval(60 * 1000)
      .subscribe(() => {
        this.calcActivityTime();
      })
  }

  addActivity(): void {
    var logEntry: LogEntity = {
      timestamp: "asdf",
      activity: "asdf"
    };

    var date = new Date();
    this.timestamp = this.datepipe.transform(date, 'yyyy-MM-dd HH:mm') || '';
    logEntry.timestamp = this.timestamp || '';

    if (this.activityFormControl?.value !== undefined && this.activityFormControl?.value !== "") {
      logEntry.activity = this.activityFormControl.value;
    }

    this.backend.addLogEntries(logEntry).subscribe(
      s => {
        this.backend.changeDone();
      }
    )
    this.calcActivityTime();
  }

  calcActivityTime(): void {
    var currentTimestamp = new Timestamp(new Date());
    this.lastTimestamp = new Timestamp(new Date(this.timestamp));
    this.currentDiff = this.lastTimestamp.diff(currentTimestamp);
  }

}
