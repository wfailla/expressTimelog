import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LogEntity } from 'src/app/model/log-entity';
import { Timestamp, TimeString } from 'src/app/model/timestamp';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-work-done-display',
  templateUrl: './work-done-display.component.html',
  styleUrls: ['./work-done-display.component.css']
})
export class WorkDoneDisplayComponent implements OnInit {
  workDone: string = '';

  constructor(
    private backend: BackendService,
    private datepipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.backend.getLogEntries(this.datepipe.transform(new Date(), 'yyyy-MM-dd') || '').subscribe(
      s => {
        this.calcDiff(s);
      }
    )

    this.backend.changeOperation.subscribe(
      s => {
        this.backend.getLogEntries(this.datepipe.transform(new Date(), 'yyyy-MM-dd') || '').subscribe(
          o => {
            this.calcDiff(o);
          }
        )
      }
    )
  }

  calcDiff(list: LogEntity[]): void {
    this.workDone = Timestamp.calcWorkTime(list);
  }

}
