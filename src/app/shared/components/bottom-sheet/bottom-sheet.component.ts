import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../../../auth/services/auth.service';
import { SettingsService } from '../../../core/services/settings.service';
import { User } from '../../../user/modals/user';
import { UserService } from '../../../user/services/user.service';

@Component({
    selector: 'app-bottom-sheet',
    templateUrl: './bottom-sheet.component.html',
    styleUrls: ['./bottom-sheet.component.css']
})
export class BottomSheetComponent implements OnInit {
    uid: string;
    $key: string;
    user$: Observable<User>;
    user: User;
    isAdmin: boolean;

    constructor(
        private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
        private authService: AuthService,
        private userService: UserService,
        private settingsService: SettingsService,
        private afs: AngularFirestore,
        private afAuth: AngularFireAuth,
    ) {
    }

    openLink(event: MouseEvent): void {
        this.bottomSheetRef.dismiss();
        event.preventDefault();
    }

    ngOnInit() {
        // Get auth data, then get firestore user document || null
        this.user$ = this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                } else {
                    return of(null);
                }
            }));
        // Unwraps the observable to extract the data.
        this.user$.subscribe((currentUserInfo) => {
            if (currentUserInfo && this.afAuth.auth.currentUser) {
                this.user = currentUserInfo;
                this.isAdmin = currentUserInfo.admin === true;
            } else {
                return of(null);
            }
        });
    }
}
