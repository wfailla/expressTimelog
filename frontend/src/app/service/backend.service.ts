import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(
    private http: HttpClient
  ) { }

  public getLogEntries() {
    console.log(this.http.get("/api/log"));
  }
}
