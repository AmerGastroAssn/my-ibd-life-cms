import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../../user/modals/user';
import { Settings } from '../models/setting';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    settingsAdded = new EventEmitter<Settings>();
    localSettings: Settings;
    settingsDoc: AngularFirestoreDocument<Settings>;
    settings$: Observable<Settings>;
    settings: Settings;
    settings$key: string;
    disableAdmin: boolean;
    allowSettings: boolean;
    allowSignup: boolean;
    user$: Observable<User>;


    constructor(
        private sbAlert: MatSnackBar,
        private afs: AngularFirestore,
        private afAuth: AngularFireAuth,
    ) {

        this.settings$key = 'YgCYgsItfFPq4DkNCHZq';
        // Checks authentication of user and get's ID.
        this.user$ = this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                } else {
                    return of(null);
                }
            }));
        // if (localStorage.getItem('settings') !== null) {
        //     this.localSettings = JSON.parse(localStorage.getItem('settings'));
        // }
    }

    /* If settings not in local storage, then
     get settings from Firestore and save in local storage to use */
    getAdminSettings(): Settings {
        if (localStorage.getItem('settings') && this.user$) {
            const local = localStorage.getItem('settings');
            return this.localSettings = JSON.parse(local);
        } else {
            this.getSettings()
                .subscribe((settings) => {
                    this.saveLocalSettings(settings);
                });

            const local = localStorage.getItem('settings');
            return this.localSettings = JSON.parse(local);


        }
    }

    saveLocalSettings(settings) {
        localStorage.setItem('settings', JSON.stringify(settings));
        this.settingsAdded.emit(settings);
    }


    getSettings(): Observable<Settings> {
        this.settingsDoc = this.afs.doc<Settings>(`settings/${this.settings$key}`);
        this.settings$ = this.settingsDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as Settings;
                data.id = action.payload.id;
                // console.log('data.key', data);
                return data;
            }
        });
        return this.settings$;

    }


    updateSettings(settings): void {
        this.settingsDoc = this.afs.doc<Settings>(`settings/${this.settings$key}`);

        this.settingsDoc.update(settings)
            .then(() => {
                this.saveLocalSettings(settings);
                this.sbAlert.open('Settings Saved!', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-success']
                });
                console.log('Settings updated', settings);
            })
            .catch((error) => {
                this.sbAlert.open('Settings NOT Saved.', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-danger']
                });
                console.log(`ERROR~uDV: `, error);
            });
    }
}
