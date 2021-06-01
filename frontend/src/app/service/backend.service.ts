import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogEntity } from '../model/log-entity';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class BackendService {

  public changeOperation = new Subject<boolean>();

  constructor(
    private http: HttpClient
  ) { }

  public getLogEntries(day: string) {
    return this.http.get<LogEntity[]>("http://localhost:3000/api/log?day="+day);
  }

  public addLogEntries(logEntity: LogEntity) {
    return this.http.post("http://localhost:3000/api/log", logEntity);
  }

  public changeDone(): void {
    this.changeOperation.next(true);
  }
}
