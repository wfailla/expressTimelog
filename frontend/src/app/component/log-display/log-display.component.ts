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

  constructor(
    private backend: BackendService,
    private changeDetctorRefs: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.sync();
  }

  sync(): void {
    this.logsDiff = [];
    var lastTimestamp: Timestamp;
    this.backend.getLogEntries().subscribe(
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

}
