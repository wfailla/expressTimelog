import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { LogEntity, LogEntityRow } from 'src/app/model/log-entity';
import { Timestamp } from 'src/app/model/timestamp';
import { BackendService } from 'src/app/service/backend.service';
import { DateService } from 'src/app/service/date.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-log-display',
  templateUrl: './log-display.component.html',
  styleUrls: ['./log-display.component.css']
})
export class LogDisplayComponent implements OnInit {
  displayedColumns: string[] = ['abstime', 'timestamp', 'activity'];
  dataSource = new MatTableDataSource<LogEntityRow>();
  logsDiff: LogEntityRow[] = [];
  day: Date = new Date(Date.now());
  btnText = "download";

  constructor(
    private backend: BackendService,
    private changeDetctorRefs: ChangeDetectorRef,
    private datepipe: DatePipe,
    private dateService: DateService,
  ) { }

  ngOnInit(): void {
    this.backend.changeOperation.subscribe(
      s => {
        this.sync()
      }
    );
    this.dateService.date.subscribe(
      s => {
        this.day = s;
        this.sync();
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
              abstime: o.timestamp,
              timestamp: "0 h 0 min",
              activity: o.activity
            });
          } else {
            var currentTimestamp = new Timestamp(new Date(o.timestamp));
            this.logsDiff.push({
              abstime: o.timestamp,
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

  generateCSV() {
    let csvData = "abstime,timestamp,activity";

    this.logsDiff.forEach( s => {
      csvData += "\n";
      csvData += s.abstime + ',';
      csvData += s.timestamp + ',';
      csvData += s.activity;
    })

    var blob = new Blob([csvData], {type: 'text/csv'});
    saveAs(blob, this.day + ".csv");
  }

}
