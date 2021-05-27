import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogEntity } from '../model/log-entity';



@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(
    private http: HttpClient
  ) { }

  public getLogEntries(day: string) {
    return this.http.get<LogEntity[]>("http://localhost:3000/api/log?day="+day);
  }

  public addLogEntries(logEntity: LogEntity) {
    return this.http.post("http://localhost:3000/api/log", logEntity);
  }
}
