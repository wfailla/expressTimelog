import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LogEntity } from 'src/app/model/log-entity';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-log-display',
  templateUrl: './log-display.component.html',
  styleUrls: ['./log-display.component.css']
})
export class LogDisplayComponent implements OnInit {
  displayedColumns: string[] = ['timestamp', 'activity'];
  logs: LogEntity[] = [];

  constructor(
    private backend: BackendService,
    private changeDetctorRefs: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.backend.getLogEntries().subscribe(
      s => {
        this.logs = s;
      },
      e => {
        console.log(e);
      },
      () => {
        this.changeDetctorRefs.detectChanges();
      }
    )
  }

}
