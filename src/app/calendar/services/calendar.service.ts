import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Calendar } from '../models/Calendar';

@Injectable({
    providedIn: 'root'
})
export class CalendarService {
    calendarCollection: AngularFirestoreCollection<Calendar>;
    calendarDoc: AngularFirestoreDocument<Calendar>;
    calendar$: Observable<Calendar>;
    calendars$: Observable<Calendar[]>;
    // calColumnValuesDoc: AngularFirestoreDocument<CalColumnValues>;
    // calColumnValue$: Observable<CalColumnValues>;
    // calColumnValueCollection: AngularFirestoreCollection<CalColumnValues>;
    // calColumnValues$: Observable<CalColumnValues[]>;

    $key: string;
    calColumnValue$key: string;

    stampDateNum: any;
    stampStartNum: any;
    stampEndNum: any;


    constructor(
        private afs: AngularFirestore,
        private router: Router,
        public sbAlert: MatSnackBar,
    ) {
        this.calColumnValue$key = 'BYowCajpbtyWUMVCWDUY';
    }

    getAllCalendars(): Observable<Calendar[]> {
        this.calendarCollection = this.afs.collection<Calendar>('calendar');
        return this.calendarCollection.valueChanges();
    }

    getCalendarByTitle(title: string): Observable<Calendar[]> {
        this.calendarCollection = this.afs.collection<Calendar>('calendar', ref => {
            return ref.where('title', '==', `${title}`);
        });
        return this.calendars$ = this.calendarCollection.valueChanges();
    }

    getCalendar(key: string): Observable<Calendar> {
        this.calendarDoc = this.afs.doc<Calendar>(`calendar/${key}`);
        this.calendar$ = this.calendarDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as Calendar;
                data.$key = action.payload.id;
                return data;
            }
        });
        return this.calendar$;
    }


    updateCalendar(formData, id): object {
        const calRef: AngularFirestoreDocument<Calendar> = this.afs.doc(`calendar/${id}`);

        const data: Calendar = {
            $key: id,
            body1: formData.body1,
            body2: formData.body2,
            body3: formData.body3,
            body4: formData.body4,
            date1: formData.date1,
            date2: formData.date2,
            date3: formData.date3,
            date4: formData.date4,
            title: formData.title,
            displayName: formData.displayName,
            uid: id,
        };

        console.log('data', data);
        return calRef.set(data, { merge: true })
                     .then(() => {
                         this.router.navigate(['/calendar']);
                         this.sbAlert.open('Calendar Event was Updated!', 'Dismiss', {
                             duration: 3000,
                             verticalPosition: 'bottom',
                             panelClass: ['snackbar-success']
                         });
                         console.log('Calendar Updated!', data);
                     })
                     .catch((error) => console.log(`ERROR~uC: `, error));
    }

    saveCalendar(formData): object {
        const new$key = this.afs.createId();
        const calRef: AngularFirestoreDocument<Calendar> = this.afs.doc(`calendar/${new$key}`);

        const data: Calendar = {
            $key: new$key,
            body1: formData.body1,
            body2: formData.body2,
            body3: formData.body3,
            body4: formData.body4,
            date1: formData.date1,
            date2: formData.date2,
            date3: formData.date3,
            date4: formData.date4,
            title: formData.title,
            displayName: formData.displayName,
            uid: new$key,
        };

        console.log('data', data);
        return calRef.set(data)
                     .then(() => {
                         this.router.navigate(['/calendar']);
                         this.sbAlert.open('Calendar Event was Updated!', 'Dismiss', {
                             duration: 3000,
                             verticalPosition: 'bottom',
                             panelClass: ['snackbar-success']
                         });
                         console.log('Calendar Saved!', data);
                     })
                     .catch((error) => console.log(`ERROR~uC: `, error));
    }


}
