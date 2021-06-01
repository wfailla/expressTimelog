import { Component, OnInit } from '@angular/core';
import { DateService } from 'src/app/service/date.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
  day: Date = new Date();

  constructor(
    private dateService: DateService,
  ) { }

  ngOnInit(): void {
    this.dateService.date.subscribe(
      s => {
        this.day = s;
      }
    )
  }


  nextDay(): void {
    this.dateService.setDate(new Date(this.day.setDate(this.day.getDate() + 1)));
  }
  previousDay(): void {
    this.dateService.setDate(new Date(this.day.setDate(this.day.getDate() - 1)));
  }

  today(): void {
    this.dateService.setDate(new Date());
  }
}
