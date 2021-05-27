import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LogEntity } from 'src/app/model/log-entity';
import { BackendService } from 'src/app/service/backend.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-log-input',
  templateUrl: './log-input.component.html',
  styleUrls: ['./log-input.component.css']
})
export class LogInputComponent implements OnInit {
  activityFormControl = new FormControl('', []);

  constructor(
    private backend: BackendService,
    private datepipe: DatePipe,
  ) { }

  ngOnInit(): void {
  }

  addActivity(): void {
    var logEntry: LogEntity = {
      timestamp: "asdf",
      activity: "asdf"
    };
    console.log(this.activityFormControl);
    var date = new Date();
    var timestamp = this.datepipe.transform(date, 'yyyy-MM-dd');
    logEntry.timestamp = timestamp || '';

    if (this.activityFormControl?.value !== undefined && this.activityFormControl?.value !== "") {
      logEntry.activity = this.activityFormControl.value;
    }
    this.backend.addLogEntries(logEntry).subscribe(
      s => {
        console.log('added');
        console.log(logEntry);
      }
    )
  }

}
