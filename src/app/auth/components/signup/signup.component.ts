import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SettingsService } from '../../../core/services/settings.service';
import { User } from '../../../user/modals/user';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    signupForm: FormGroup;
    user: User;
    email: string;
    password: string;
    isOnline: boolean;
    loginDate: number = Date.now();
    photoURL: string;
    admin: boolean;
    title: string;
    uid: string;
    displayName: string;
    allowSignup: boolean;
    disableAdmin: boolean;
    favicon = 'fa fa-user-lock';
    sectionName = 'Signup';


    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private settingsService: SettingsService,
        public sbAlert: MatSnackBar
    ) {
    }

    // For Form Validations
    get f() {
        return this.signupForm.controls;
    }

    ngOnInit() {
        // Settings:
        this.allowSignup = this.settingsService.getAdminSettings().allowSignup;
        this.disableAdmin = this.settingsService.getAdminSettings().disableAdmin;

        // Form:
        this.signupForm = this.fb.group({
            email: ['', Validators.compose([
                Validators.required,
                Validators.email
            ])],
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(8)
            ])],
            isOnline: [true],
            loginDate: [Date.now()],
            photoURL: ['' || 'https://s3.amazonaws.com/DDW/ddw-org/images/avatar_transparent.png'],
            admin: [{ value: false, disabled: this.disableAdmin }],
            title: ['', Validators.required],
            displayName: [''],
            uid: ['']
        });

        this.email = this.signupForm.value.email;
        this.password = this.signupForm.value.password;
        this.isOnline = this.signupForm.value.isOnline;
        this.loginDate = this.signupForm.value.loginDate;
        this.photoURL = this.signupForm.value.photoURL;
        this.admin = this.signupForm.value.admin;
        this.title = this.signupForm.value.title;
        this.displayName = this.signupForm.value.displayName;
        this.uid = this.signupForm.value.uid;
    }

    onSignup(formData: User): void {
        if (this.signupForm.valid) {
            this.authService.emailSignup(formData)
                .then(() => {
                    this.sbAlert.open('You are signed up and logged in!', 'Dismiss', {
                        duration: 3000,
                        verticalPosition: 'bottom',
                        panelClass: ['snackbar-success']
                    });
                    this.router.navigate(['/auth/login']);
                })
                .catch((error) => {
                    console.log(`Error~eS:`, error);
                    this.sbAlert.open(error, 'Dismiss', {
                        duration: 3000,
                        verticalPosition: 'bottom',
                        panelClass: ['snackbar-danger']
                    });
                });
            this.signupForm.reset();
        }
    }
}
