import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Timestamp, TimeString } from 'src/app/model/timestamp';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-timereport',
  templateUrl: './timereport.component.html',
  styleUrls: ['./timereport.component.css']
})
export class TimereportComponent implements OnInit {
  timeSpend = new Map<string, TimeString>();
  day: Date = new Date(Date.now());

  constructor(
    private backend: BackendService,
    private datepipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.sync();
    this.backend.changeOperation.subscribe(
      s => {
        this.sync();
      }
    )
  }

  sync(): void {
    this.timeSpend = new Map<string, TimeString>();
    this.backend.getLogEntries(this.datepipe.transform(this.day, 'yyyy-MM-dd') || '')
      .subscribe(
        s => {
          this.timeSpend = Timestamp.calcTimeByGroup(s);
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
