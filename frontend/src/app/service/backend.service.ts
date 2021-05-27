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

  public getLogEntries() {
    return this.http.get<LogEntity[]>("http://localhost:3000/api/log");
  }


  public addLogEntries(logEntity: LogEntity) {
    console.log("adding ");
    console.log(logEntity)
    return this.http.post("http://localhost:3000/api/log", logEntity);
  }
}
