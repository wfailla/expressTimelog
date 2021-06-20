import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LogEntity } from 'src/app/model/log-entity';
import { Timestamp, TimeString } from 'src/app/model/timestamp';
import { BackendService } from 'src/app/service/backend.service';
import { DateService } from 'src/app/service/date.service';

@Component({
  selector: 'app-work-done-display',
  templateUrl: './work-done-display.component.html',
  styleUrls: ['./work-done-display.component.css']
})
export class WorkDoneDisplayComponent implements OnInit {
  workDone: string = '';
  day: Date = new Date(Date.now());

  constructor(
    private backend: BackendService,
    private datepipe: DatePipe,
    private dateService: DateService,
  ) { }

  ngOnInit(): void {
    this.backend.getLogEntries(this.datepipe.transform(this.day, 'yyyy-MM-dd') || '').subscribe(
      s => {
        this.calcDiff(s);
      }
    )

    this.backend.changeOperation.subscribe(
      s => {
        this.backend.getLogEntries(this.datepipe.transform(this.day, 'yyyy-MM-dd') || '').subscribe(
          o => {
            this.calcDiff(o);
          }
        )
      }
    )
    this.dateService.date.subscribe(
      s => {
        this.day = s;
      }
    )
  }

  calcDiff(list: LogEntity[]): void {
    this.workDone = Timestamp.calcWorkTime(list);
  }

}
