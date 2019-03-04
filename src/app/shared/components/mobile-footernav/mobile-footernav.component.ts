import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../../auth/services/auth.service';
import { SettingsService } from '../../../core/services/settings.service';
import { User } from '../../../user/modals/user';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../../../user/services/user.service';

@Component({
  selector: 'app-mobile-footernav',
  templateUrl: './mobile-footernav.component.html',
  styleUrls: ['./mobile-footernav.component.css']
})
export class MobileFooternavComponent implements OnInit {
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
    ) {
        // Gets User in Local Storage
        if (this.isLoggedIn) {
            this.localUser = this.authService.getProfile();
        }

        // Checks authentication of user and get's ID.
        this.authService.getAuth().subscribe((auth) => {
            if (auth) {
                this.isLoggedIn = true;
                this.loggedInUser = auth.email;
                this.uid = auth.uid;
            } else {
                this.isLoggedIn = false;
            }
        });
    }

    ngOnInit() {
        // Settings:
        this.allowSignup = this.settingsService.getAdminSettings().allowSignup;
        this.allowSettings = this.settingsService.getAdminSettings().allowSettings;

        // Get auth data, then get firestore user document || null
        this.user$ = this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                } else {
                    return of(null);
                }
            }));

        this.user$.subscribe((currentUserInfo) => {
            if (currentUserInfo && this.afAuth.auth.currentUser) {
                this.user = currentUserInfo;
                this.authService.setUserInLocalStorage(currentUserInfo);
                this.isAdmin = currentUserInfo.admin === true;
            } else {
                return of(null);
            }
        });
    }

    onLogout() {
        this.authService.logout();
    }


}
