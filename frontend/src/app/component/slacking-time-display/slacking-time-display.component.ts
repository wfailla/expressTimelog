import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LogEntity } from 'src/app/model/log-entity';
import { Timestamp } from 'src/app/model/timestamp';
import { BackendService } from 'src/app/service/backend.service';
import { DateService } from 'src/app/service/date.service';

@Component({
  selector: 'app-slacking-time-display',
  templateUrl: './slacking-time-display.component.html',
  styleUrls: ['./slacking-time-display.component.css']
})
export class SlackingTimeDisplayComponent implements OnInit {
  slackingTime: string = '';
  day: Date = new Date(Date.now());

  constructor(
    private backend: BackendService,
    private datepipe: DatePipe,
    private dateService: DateService,
  ) { }

  ngOnInit(): void {
    this.calcDiff();

    this.backend.changeOperation.subscribe(
      s => {
        this.calcDiff();
      }
    )
    this.dateService.date.subscribe(
      s => {
        this.day = s;
        this.calcDiff();
      }
    )
  }

  calcDiff(): void {
      this.backend.getLogEntries(this.datepipe.transform(this.day, 'yyyy-MM-dd') || '').subscribe(
        o => {
          this.slackingTime = Timestamp.calculateSlackingTime(o);
        }
      )
    }
}
