import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { LogEntity, LogEntityRow } from 'src/app/model/log-entity';
import { Timestamp } from 'src/app/model/timestamp';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-log-display',
  templateUrl: './log-display.component.html',
  styleUrls: ['./log-display.component.css']
})
export class LogDisplayComponent implements OnInit {
  displayedColumns: string[] = ['timestamp', 'activity'];
  dataSource = new MatTableDataSource<LogEntity>();
  logsDiff: LogEntity[] = [];
  day: Date = new Date(Date.now());

  constructor(
    private backend: BackendService,
    private changeDetctorRefs: ChangeDetectorRef,
    private datepipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.sync();
    this.backend.changeOperation.subscribe(
      s => {
        this.sync()
      }
    )
  }

  sync(): void {
    this.logsDiff = [];
    var lastTimestamp: Timestamp;
    this.backend.getLogEntries(this.datepipe.transform(this.day, 'yyyy-MM-dd') || '').subscribe(
      s => {
        s.forEach( o => {
          if ( lastTimestamp === undefined ) {
            this.logsDiff.push({
              timestamp: "0 h 0 min",
              activity: o.activity
            });
          } else {
            var currentTimestamp = new Timestamp(new Date(o.timestamp));
            this.logsDiff.push({
              timestamp: lastTimestamp.diff(currentTimestamp),
              activity: o.activity
            });
          }
          lastTimestamp = new Timestamp(new Date(o.timestamp))
        })
      },
      e => {
        console.log(e);
      },
      () => {
        this.dataSource.data = this.logsDiff;
        this.changeDetctorRefs.detectChanges();
      }
    )
  }

  nextDay(): void {
    this.day = new Date(this.day.setDate(this.day.getDate() + 1));
    this.sync();
  }
  previousDay(): void {
    this.day = new Date(this.day.setDate(this.day.getDate() - 1));
    this.sync();
  }

}
