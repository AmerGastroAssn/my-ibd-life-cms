import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../user/modals/user';
import { UserService } from '../../user/services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    currentUser: User;

    constructor(
        private authService: AuthService,
        private router: Router,
        private flashMessage: FlashMessagesService,
        private sbAlert: MatSnackBar,
        private userService: UserService,
        private afAuth: AngularFireAuth,
    ) {
        this.currentUser = this.authService.getProfile();
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (this.currentUser.admin === true) {
            return true;
        } else {
            this.router.navigate(['/auth/login']);
            this.flashMessage.show(`Insufficient privileges. Please contact the Development team for help.`, {
                cssClass: 'alert-warning',
                timeout: 5000
            });
            this.sbAlert.open(`Insufficient privileges. Please contact the Development team for help.`, 'Dismiss', {
                duration: 5000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-warning']
            });
            return false;
        }
    }
}
