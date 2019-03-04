import { Component, Input, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { Calendar } from '../../models/Calendar';

@Component({
    selector: 'app-admin-calendar-item',
    templateUrl: './calendar-item.component.html',
    styleUrls: ['./calendar-item.component.css']
})
export class CalendarItemComponent implements OnInit {
    @Input() calendar: Calendar;
    $key: string;
    body1: string;
    body2: string;
    body3: string;
    body4: string;
    date1: number;
    date2: number;
    date3: number;
    date4: number;
    title: string;
    uid: string;
    month: string;
    month2: string;
    month3: string;
    month4: string;

    constructor() {
    }

    ngOnInit() {
        this.isAbbrvDate();
    }

    isAbbrvDate() {
        // Date 1
        if (this.calendar.date1) {
            const date1AsString = this.calendar.date1.toDate().toDateString();
            if (date1AsString.includes('Jan')) {
                this.month = 'Jan.';
            } else if (date1AsString.includes('Feb')) {
                this.month = 'Feb.';
            } else if (date1AsString.includes('Mar')) {
                this.month = 'March';
            } else if (date1AsString.includes('Apr')) {
                this.month = 'April';
            } else if (date1AsString.includes('May')) {
                this.month = 'May';
            } else if (date1AsString.includes('Jun')) {
                this.month = 'June';
            } else if (date1AsString.includes('Jul')) {
                this.month = 'July';
            } else if (date1AsString.includes('Aug')) {
                this.month = 'Aug.';
            } else if (date1AsString.includes('Sep')) {
                this.month = 'Sep.';
            } else if (date1AsString.includes('Oct')) {
                this.month = 'Oct.';
            } else if (date1AsString.includes('Nov')) {
                this.month = 'Nov.';
            } else if (date1AsString.includes('Dec')) {
                this.month = 'Dec.';
            } else {
                return of(null);
            }
        }


        // Date 2
        if (this.calendar.date2) {
            const date2AsString = this.calendar.date2.toDate().toDateString();
            if (date2AsString.includes('Jan')) {
                this.month2 = 'Jan.';
            } else if (date2AsString.includes('Feb')) {
                this.month2 = 'Feb.';
            } else if (date2AsString.includes('Mar')) {
                this.month2 = 'March';
            } else if (date2AsString.includes('Apr')) {
                this.month2 = 'April';
            } else if (date2AsString.includes('May')) {
                this.month2 = 'May';
            } else if (date2AsString.includes('Jun')) {
                this.month2 = 'June';
            } else if (date2AsString.includes('Jul')) {
                this.month2 = 'July';
            } else if (date2AsString.includes('Aug')) {
                this.month2 = 'Aug.';
            } else if (date2AsString.includes('Sep')) {
                this.month2 = 'Sep.';
            } else if (date2AsString.includes('Oct')) {
                this.month2 = 'Oct.';
            } else if (date2AsString.includes('Nov')) {
                this.month2 = 'Nov.';
            } else if (date2AsString.includes('Dec')) {
                this.month2 = 'Dec.';
            } else {
                return of(null);
            }
        }


        // Date 3
        if (this.calendar.date3) {
            const date3AsString = this.calendar.date3.toDate().toDateString();
            if (date3AsString.includes('Jan')) {
                this.month3 = 'Jan.';
            } else if (date3AsString.includes('Feb')) {
                this.month3 = 'Feb.';
            } else if (date3AsString.includes('Mar')) {
                this.month3 = 'March';
            } else if (date3AsString.includes('Apr')) {
                this.month3 = 'April';
            } else if (date3AsString.includes('May')) {
                this.month3 = 'May';
            } else if (date3AsString.includes('Jun')) {
                this.month3 = 'June';
            } else if (date3AsString.includes('Jul')) {
                this.month3 = 'July';
            } else if (date3AsString.includes('Aug')) {
                this.month3 = 'Aug.';
            } else if (date3AsString.includes('Sep')) {
                this.month3 = 'Sep.';
            } else if (date3AsString.includes('Oct')) {
                this.month3 = 'Oct.';
            } else if (date3AsString.includes('Nov')) {
                this.month3 = 'Nov.';
            } else if (date3AsString.includes('Dec')) {
                this.month3 = 'Dec.';
            } else {
                return of(null);
            }
        }


        // Date 4
        if (this.calendar.date4) {
            const date4AsString = this.calendar.date4.toDate().toDateString();
            if (date4AsString.includes('Jan')) {
                this.month4 = 'Jan.';
            } else if (date4AsString.includes('Feb')) {
                this.month4 = 'Feb.';
            } else if (date4AsString.includes('Mar')) {
                this.month4 = 'March';
            } else if (date4AsString.includes('Apr')) {
                this.month4 = 'April';
            } else if (date4AsString.includes('May')) {
                this.month4 = 'May';
            } else if (date4AsString.includes('Jun')) {
                this.month4 = 'June';
            } else if (date4AsString.includes('Jul')) {
                this.month4 = 'July';
            } else if (date4AsString.includes('Aug')) {
                this.month4 = 'Aug.';
            } else if (date4AsString.includes('Sep')) {
                this.month4 = 'Sep.';
            } else if (date4AsString.includes('Oct')) {
                this.month4 = 'Oct.';
            } else if (date4AsString.includes('Nov')) {
                this.month4 = 'Nov.';
            } else if (date4AsString.includes('Dec')) {
                this.month4 = 'Dec.';
            } else {
                return of(null);
            }
        }


    }

}
