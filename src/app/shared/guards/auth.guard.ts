import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private afAuth: AngularFireAuth,
        private router: Router,
        private flashMessage: FlashMessagesService,
        public sbAlert: MatSnackBar,
    ) {
    }

    canActivate(): Observable<boolean> {
        return (this.afAuth.authState)
        .take(1)
        .map((state) => !!state)
        .do((authenticated) => {
            if (!authenticated) {
                this.router.navigate(['/auth/login']);
                this.flashMessage.show(`Sorry, you do not have sufficient privileges. Please contact the Web Development team for help.`, {
                    cssClass: 'alert-warning',
                    timeout: 5000
                });
                this.sbAlert.open('Sorry, you do not have sufficient privileges. Please contact the Web Development team for help.', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-warning']
                });
            }
        });
    }
}
