import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../user/modals/user';
import { UserService } from '../../../user/services/user.service';
import { SettingsService } from '../../services/settings.service';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
    isLoggedIn: boolean;
    loggedInUser: string;
    currentUser: User;
    allowSignup: boolean;
    allowSettings: boolean;
    uid: string;
    id: string;
    showPagesToggle: boolean;
    showContentSectionToggle: boolean;
    showUsersToggle: boolean;
    showCalendarToggle: boolean;
    showPressReleaseToggle: boolean;
    showPageCardToggle: boolean;
    showImagesToggle: boolean;
    showFilesToggle: boolean;
    showBlogPostToggle: boolean;
    user: User;
    user$: Observable<User>;
    isAdmin: boolean;
    logo: string;

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private settingsService: SettingsService,
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore
    ) {
        this.logo = 'https://firebasestorage.googleapis.com/v0/b/my-ibd-life-dev.appspot.com/o/images%2F2019%2F1551821167531_my_ibd_life_logo_grey_250.png?alt=media&token=14b5d8ae-2a1a-4794-a479-f0d66103f8b1';
    }

    ngOnInit() {
        // Settings:
        this.allowSignup = this.settingsService.getAdminSettings().allowSignup;
        this.allowSettings = this.settingsService.getAdminSettings().allowSettings;

        this.authService.getAuth().subscribe((auth) => {
            if (auth) {
                this.isLoggedIn = true;
                this.loggedInUser = auth.email;
                this.currentUser = this.authService.getProfile();
            } else {
                this.isLoggedIn = false;
            }
        });

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
                this.isAdmin = currentUserInfo.admin === true;
            } else {
                return of(null);
            }
        });
    }

    onShowPagesToggle() {
        this.showPagesToggle = !this.showPagesToggle;
    }

    onShowContentSectionToggle() {
        this.showContentSectionToggle = !this.showContentSectionToggle;
    }

    onShowUsersToggle() {
        this.showUsersToggle = !this.showUsersToggle;
    }

    onShowCalendarToggle() {
        this.showCalendarToggle = !this.showCalendarToggle;
    }

    onShowPressReleaseToggle() {
        this.showPressReleaseToggle = !this.showPressReleaseToggle;
    }

    onShowPageCardToggle() {
        this.showPageCardToggle = !this.showPageCardToggle;
    }


    onShowImagesToggle() {
        this.showImagesToggle = !this.showImagesToggle;
    }


    onShowFilesToggle() {
        this.showFilesToggle = !this.showFilesToggle;
    }

    onShowBlogPostToggle() {
        this.showBlogPostToggle = !this.showBlogPostToggle;
    }

    onLogout() {
        this.authService.logout();
    }
}
