import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LogEntity } from 'src/app/model/log-entity';
import { Timestamp } from 'src/app/model/timestamp';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-slacking-time-display',
  templateUrl: './slacking-time-display.component.html',
  styleUrls: ['./slacking-time-display.component.css']
})
export class SlackingTimeDisplayComponent implements OnInit {
  slackingTime: string = '';

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
    this.slackingTime = Timestamp.calculateSlackingTime(list);
  }
}
