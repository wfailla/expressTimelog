import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  public date = new BehaviorSubject<Date>(new Date());

  constructor() { }

  public setDate(date: Date) {
    this.date.next(date);
  }
  
}
