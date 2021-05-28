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
  timeSpend= new Map<string, TimeString>();

  constructor(
    private backend: BackendService,
    private datepipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.backend.getLogEntries(this.datepipe.transform(new Date(), 'yyyy-MM-dd') || '')
      .subscribe(
        s => {
          this.timeSpend = Timestamp.calcTimeByGroup(s, 'meeting');
        }
      )
    this.backend.changeOperation.subscribe(
      s => {
        this.backend.getLogEntries(this.datepipe.transform(new Date(), 'yyyy-MM-dd') || '').subscribe(
          o => {
            this.timeSpend = Timestamp.calcTimeByGroup(o, 'meeting');
          }
        )
      }
    )
  }

}
