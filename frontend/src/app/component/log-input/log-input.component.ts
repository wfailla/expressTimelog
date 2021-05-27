import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LogEntity } from 'src/app/model/log-entity';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-log-input',
  templateUrl: './log-input.component.html',
  styleUrls: ['./log-input.component.css']
})
export class LogInputComponent implements OnInit {
  activityFormControl = new FormControl('', []);

  constructor(
    private backend: BackendService,
  ) { }

  ngOnInit(): void {
  }

  addActivity(): void {
    var logEntry: LogEntity = {
      timestamp: "asdf",
      activity: "asdf"
    };
    if ( this.activityFormControl.get('timestamp')?.value !== undefined ) {
      logEntry.timestamp = this.activityFormControl.get('timestamp')?.value;
    }
    if ( this.activityFormControl.get('activity')?.value !== undefined ) {
      logEntry.timestamp = this.activityFormControl.get('activity')?.value;
    }
    this.backend.addLogEntries(logEntry);
  }

}
