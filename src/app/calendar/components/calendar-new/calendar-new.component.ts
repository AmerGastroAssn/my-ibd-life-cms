import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Calendar } from '../../models/Calendar';
import { CalendarService } from '../../services/calendar.service';

@Component({
    selector: 'app-admin-calendar-new',
    templateUrl: './calendar-new.component.html',
    styleUrls: ['./calendar-new.component.css'],
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
export class CalendarNewComponent implements OnInit {
    newCalForm: FormGroup;
    calendar: Calendar;
    favicon = 'fa fa-calendar';
    sectionName = 'New Calendar';

    $key: string;
    body1: string;
    body2: string;
    body3: string;
    body4: string;
    date1: any;
    date2: any;
    date3: any;
    date4: any;
    title: string;
    displayName: string;
    uid: string;
    color = 'primary';
    bsConfig: Partial<BsDatepickerConfig>;

    CkeditorConfig = {
        allowedContent: true,
        height: 500,
        extraAllowedContent: 'span;ul;li;table;td;style;*[id];*(*);*{*}',
    };

    constructor(
      private calendarService: CalendarService,
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private sbAlert: MatSnackBar,
    ) {
        // Datepicker Config
        this.bsConfig = Object.assign({},
          {
              containerClass: 'theme-default',
              dateInputFormat: 'MMMM Do YYYY'
          });

        // New Calendar:
        this.newCalForm = this.fb.group({
            $key: [''],
            body1: ['', Validators.required],
            body2: [''],
            body3: [''],
            body4: [''],
            date1: ['', Validators.required],
            date2: [''],
            date3: [''],
            date4: [''],
            title: ['', Validators.required],
            displayName: [''],
            uid: [''],
        });

        this.$key = this.newCalForm.value.$key;
        this.title = this.newCalForm.value.title;
        this.body1 = this.newCalForm.value.body1;
        this.body2 = this.newCalForm.value.body2;
        this.body3 = this.newCalForm.value.body3;
        this.body4 = this.newCalForm.value.body4;
        this.date1 = this.newCalForm.value.date1;
        this.date2 = this.newCalForm.value.date2;
        this.date3 = this.newCalForm.value.date3;
        this.date4 = this.newCalForm.value.date4;
        this.displayName = this.newCalForm.value.displayName;
        this.uid = this.newCalForm.value.uid;
    }


    ngOnInit() {
        // // Get Column Values
        // this.calendarService.getCalColumnValues()
        //     .subscribe((values) => {
        //         this.calColumnValues = values;
        //     });
    }

    // Reactive Form
    onCalendarCreate(calendarData) {
        if (!this.newCalForm.valid) {
            this.sbAlert.open('The Title, Date 1 and Body 1 must be filled out, Event was NOT created.', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        } else {
            this.calendarService.saveCalendar(calendarData);
            console.log(calendarData);
            this.newCalForm.reset();
            this.sbAlert.open('New Calendar created!', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-success']
            });
        }
    }


}
