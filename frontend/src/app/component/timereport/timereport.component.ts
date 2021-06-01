import { DatePipe } from '@angular/common';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TimereportRow } from 'src/app/model/time-report';
import { Timestamp, TimeString } from 'src/app/model/timestamp';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-timereport',
  templateUrl: './timereport.component.html',
  styleUrls: ['./timereport.component.css']
})
export class TimereportComponent implements OnInit {
  displayedColumns: string[] = ['timestamp', 'activity'];
  dataSource = new MatTableDataSource<TimereportRow>();
  list: TimereportRow[] = [];
  timeSpend = new Map<string, TimeString>();
  day: Date = new Date(Date.now());

  constructor(
    private backend: BackendService,
    private changeDetctorRefs: ChangeDetectorRef,
    private datepipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.backend.changeOperation.subscribe(
      s => {
        this.sync();
      }
    )
  }

  sync(): void {
    this.list = [];
    this.timeSpend = new Map<string, TimeString>();
    this.backend.getLogEntries(this.datepipe.transform(this.day, 'yyyy-MM-dd') || '')
      .subscribe(
        s => {
          Timestamp.calcTimeByGroup(s)
            .forEach(
              (value: TimeString, key: string) => {
                this.list.push({
                  timestamp: value.toString(),
                  activity: key
                })
              }
            )
        },
        e => {
          console.log(e);
        },
        () => {
          this.dataSource.data = this.list;
          this.changeDetctorRefs.detectChanges();
        }
      )
    this.dataSource.data = this.list;
    this.changeDetctorRefs.detectChanges();

  }

  nextDay(): void {
    this.day = new Date(this.day.setDate(this.day.getDate() + 1));
    this.sync();
  }
  previousDay(): void {
    this.day = new Date(this.day.setDate(this.day.getDate() - 1));
    this.sync();
  }

  today(): void {
    this.day = new Date();
    this.sync();
  }

}
