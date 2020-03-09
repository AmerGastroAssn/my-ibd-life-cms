import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/take';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../../../auth/services/auth.service';
import { SettingsService } from '../../../core/services/settings.service';
import { User } from '../../../user/modals/user';
import { UserService } from '../../../user/services/user.service';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    isLoggedIn: boolean;
    loggedInUser: string;
    user$: Observable<User>;
    localUser: User;
    allowSignup: boolean;
    allowSettings: boolean;
    uid: string;
    $key: string;
    user: User;
    isAdmin: boolean;
    email: string;
    currentDate: Date;

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private settingsService: SettingsService,
        private afs: AngularFirestore,
        private afAuth: AngularFireAuth,
        private bottomSheet: MatBottomSheet,
    ) {
        this.currentDate = new Date();
        // Gets User in Local Storage
        if (this.isLoggedIn) {
            this.localUser = this.authService.getProfile();
        }

        // Checks authentication of user and get's ID.
        this.authService.getAuth().subscribe((auth: firebase.User): firebase.User | Observable<null> => {
            if (auth) {
                this.isLoggedIn = true;
                this.loggedInUser = auth.email;
                this.uid = auth.uid;
            } else {
                this.isLoggedIn = false;
                return of(null);
            }
        });
    }


    ngOnInit(): void {
        // Settings:
        // this.allowSignup = this.settingsService.getAdminSettings().allowSignup;
        // this.allowSettings = this.settingsService.getAdminSettings().allowSettings;

        // Get auth data, then get firestore user document || null
        this.user$ = this.afAuth.authState.pipe(
            switchMap((user): Observable<User> | Observable<null> => {
                if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                } else {
                    return of(null);
                }
            }));

        // Sets users login date.
        this.user$.take(1).subscribe((userInfo: User): void => {
            if (userInfo) {
                this.authService.setUserToOnline(userInfo);
            }
        });


        // Sets user to admin and logs user in local storage.
        this.user$.subscribe((currentUserInfo: User): any | Observable<null> => {
            if (currentUserInfo && this.afAuth.auth.currentUser) {
                this.user = currentUserInfo;
                this.authService.setUserInLocalStorage(currentUserInfo);
                this.isAdmin = currentUserInfo.admin === true;
            } else {
                return of(null);
            }
        });


    }

    private openBottomSheet(): void {
        this.bottomSheet.open(BottomSheetComponent);
    }

    private onLogout(): void {
        this.authService.logout();
    }

}
