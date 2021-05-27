import { Component, OnInit } from '@angular/core';
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
  }

}
