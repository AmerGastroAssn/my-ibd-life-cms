import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Calendar } from '../../models/Calendar';
import { CalendarService } from '../../services/calendar.service';

@Component({
    selector: 'app-admin-calendar-list',
    templateUrl: './calendar-list.component.html',
    styleUrls: ['./calendar-list.component.css'],
    animations: [
        // the fade-in/fade-out animation.
        trigger('simpleFadeAnimation', [

            // the "in" style determines the "resting" state of the element when it is visible.
            state('in', style({ opacity: 1 })),

            // fade in when created. this could also be written as transition('void => *')
            transition(':enter', [
                style({ opacity: 0 }),
                animate(600)
            ]),

            // fade out when destroyed. this could also be written as transition('void => *')
            transition(':leave',
              animate(300, style({ opacity: 0 })))
        ])
    ]
})
export class CalendarListComponent implements OnInit {
    calendarEvents$: Calendar[];
    favicon = 'fa fa-calendar-alt';
    sectionName = 'All Calendars';

    constructor(
      public calendarService: CalendarService,
    ) {
    }

    ngOnInit() {
        this.calendarService.getAllCalendars()
            .subscribe((dates) => {
                this.calendarEvents$ = dates;
            });
    }

}
