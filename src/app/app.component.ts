import { Component, OnInit } from '@angular/core';
import { TimeStruct } from './model/app.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  globalTime: TimeStruct;

  ngOnInit() {
    this.globalTime = { hour: 15, minute: 10, second: 1 };
  }

  update = (time: TimeStruct) => {
    if (this.isValid(time)) {
      this.globalTime = time;
    } else {
      console.log('Model shouldn\'t be updated, time is invalid: %o', time);
    }
  }

  private isValid = (t: TimeStruct): boolean => !!t && this.isValidTime(t);

  private isValidTime = (t: TimeStruct): boolean =>
    this.isNumber(t.hour) && this.isNumber(t.minute) && this.isNumber(t.second);

  private isNumber = (n: number): boolean => n !== null && n >= 0;
}
