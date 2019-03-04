import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/interval';
import { map } from 'rxjs/operators';
import { Countdown } from '../models/countdown';

export interface Time {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}


@Injectable({
    providedIn: 'root'
})
export class CountdownService {
    countdownDoc: AngularFirestoreDocument<Countdown>;
    countdown$: Observable<Countdown>;
    id: string;
    date: string;
    uid: string;

    constructor(
        private afs: AngularFirestore,
        private sbAlert: MatSnackBar,
    ) {
        this.id = 'GyuKJx6ehG2VD3f1PiBx';
    }

    timer(date: Date): Observable<Time> {
        return Observable.interval(1000)
                         .map(() => this.createTimeObject(date));
    }

    getCountdown(): Observable<Countdown> {
        this.countdownDoc = this.afs.doc<Countdown>(`countdownDate/${this.id}`);
        return this.countdownDoc.valueChanges();
    }


    getCountdownDetails(): Observable<Countdown> {
        this.countdownDoc = this.afs.doc<Countdown>(`countdownDate/${this.id}`);
        this.countdown$ = this.countdownDoc.snapshotChanges().pipe(
            map((action) => {
                if (action.payload.exists === false) {
                    return null;
                } else {
                    const data = action.payload.data() as Countdown;
                    data.id = action.payload.id;
                    return data;
                }
            })
        );

        return this.countdown$;
    }

    updateCountdown(updatedCountdown): void {
        this.countdownDoc = this.afs.doc<Countdown>(`countdownDate/${this.id}`);

        this.countdownDoc.update(updatedCountdown)
            .then(() => {
                this.sbAlert.open('Countdown was Saved!', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-success']
                });
                console.log('Countdown updated', updatedCountdown);
            })
            .catch((error) => {
                this.sbAlert.open('Countdown was NOT Saved.', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-danger']
                });
                console.log(`ERROR~uM: `, error);
            });
    }

    private createTimeObject(date: Date): Time {

        const now = new Date().getTime();
        const distance = date.getTime() - now;

        const time: Time = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        time.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        time.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        time.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        time.seconds = Math.floor((distance % (1000 * 60)) / 1000);
        return time;
    }
}
