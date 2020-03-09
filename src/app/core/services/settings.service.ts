import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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

        this.settings$key = 'j2u1SKOP7DOvvXY8Vrpc';
        // Checks authentication of user and get's ID.
        this.user$ = this.afAuth.authState.pipe(
            switchMap((user): Observable<User> | Observable<null> => {
                if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                } else {
                    return of(null);
                }
            }));
    }

    /* If settings not in local storage, then
     get settings from Firestore and save in local storage to use */
    getAdminSettings(): Settings | object {
        if (localStorage.getItem('settings') && this.user$) {
            const local: string = localStorage.getItem('settings');
            return this.localSettings = JSON.parse(local);
        } else {
            this.getSettings()
                .subscribe((settings) => {
                    this.saveLocalSettings(settings);
                });

            const local: string = localStorage.getItem('settings');
            return this.localSettings = JSON.parse(local);
        }
    }

    saveLocalSettings(settings: Settings): void {
        localStorage.setItem('settings', JSON.stringify(settings));
        this.settingsAdded.emit(settings);
    }


    getSettings(): null | Observable<Settings> {
        this.settingsDoc = this.afs.doc<Settings>(`settings/${this.settings$key}`);
        this.settings$ = this.settingsDoc.snapshotChanges().pipe(
            map((action) => {
                if (action.payload.exists === false) {
                    return null;
                } else {
                    const data = action.payload.data() as Settings;
                    data.id = action.payload.id;
                    // console.log('data.key', data);
                    return data;
                }
            })
        );
        return this.settings$;

    }


    updateSettings(settings: Settings): void {
        this.settingsDoc = this.afs.doc<Settings>(`settings/${this.settings$key}`);

        this.settingsDoc.update(settings)
            .then(() => {
                this.saveLocalSettings(settings);
                this.sbAlert.open('Settings Saved!', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-success']
                });
            })
            .catch((error: string) => {
                this.sbAlert.open('Settings NOT Saved.', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-danger']
                });
                console.log(`ERROR~uDV: `, error);
            });
    }
}
