import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Calendar } from '../models/Calendar';
import { CalendarService } from '../services/calendar.service';

@Component({
    selector: 'app-admin-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
    calendarEvents$: Observable<Calendar[]>;
    day: string;

    constructor(
        readonly calendarService: CalendarService,
    ) {
    }

    ngOnInit() {
        this.calendarEvents$ = this.calendarService.getAllCalendars();
    }
}
