import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { TimeStruct } from '../model/app.models';

@Component({
    selector: 'app-time',
    template: `
<mat-form-field>
<input type="time" matInput 
    [placeholder]="lbl" [(ngModel)]="model" (ngModelChange)="modelChanged($event)">
</mat-form-field>
`
})
export class TimeComponent implements OnInit {
    @Input() time: TimeStruct;
    @Input() lbl: string;
    @Output() change: EventEmitter<TimeStruct> = new EventEmitter<TimeStruct>();
    model: string;

    ngOnInit() {
        this.model = this.toStr(this.time);
        console.log('model: %s', this.model);
    }

    modelChanged(newValue: string) {
        this.model = newValue;
        const parsed = this.toTime(newValue);
        if (parsed) {
            this.change.emit(parsed);
        }
    }

    private toStr = (time: TimeStruct): string => {
        return this.parse(time.hour) + ':' + this.parse(time.minute);
    }

    private parse = (num: number): string => ('0' + num).slice(-2);

    private toTime = (str: string): TimeStruct => {
        if (!str || str.indexOf(':') === -1 || str.length > 5) {
            console.log('%cCouldn\'t parse time: "%s"', 'background-color: LavenderBlush; color: crimson', str);
            return null;
        }
        const splitted = str.split(':');

        return { hour: +splitted[0], minute: +splitted[1], second: 0 };
    }
}