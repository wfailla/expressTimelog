import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-log-display',
  templateUrl: './log-display.component.html',
  styleUrls: ['./log-display.component.css']
})
export class LogDisplayComponent implements OnInit {
  logs = 'test';

  constructor(
    private backend: BackendService
  ) { }

  ngOnInit(): void {
    this.backend.getLogEntries().subscribe(
      s => {
        this.logs = s.toString();
      },
      e => {
        console.log(e);
      }
    )
  }

}
