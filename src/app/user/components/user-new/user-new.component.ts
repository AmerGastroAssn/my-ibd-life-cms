import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../../auth/services/auth.service';
import { SettingsService } from '../../../core/services/settings.service';
import { User } from '../../modals/user';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-admin-user-new',
    templateUrl: './user-new.component.html',
    styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {
    newUserForm: FormGroup;
    email: string;
    password: string;
    isOnline: boolean;
    loginDate: number = Date.now();
    photoURL: string;
    admin: boolean;
    displayName: string;
    title: string;
    uid: string;
    disableAdminOnNew: boolean;


    constructor(
        private userService: UserService,
        private flashMessage: FlashMessagesService,
        private fb: FormBuilder,
        private settingsService: SettingsService,
        private authService: AuthService,
        public sbAlert: MatSnackBar,
    ) {

    }

    // For Form Validations
    get f() {
        return this.newUserForm.controls;
    }

    ngOnInit() {
        // Settings
        this.disableAdminOnNew = this.settingsService.getAdminSettings().disableAdmin;


        // Form:
        this.newUserForm = this.fb.group({
            email: ['', Validators.compose([
                Validators.required,
                Validators.email
            ])],
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(8)
            ])],
            displayName: ['', Validators.required],
            isOnline: [false],
            loginDate: [Date.now()],
            photoURL: ['https://s3.amazonaws.com/DDW/ddw-org/images/avatar_transparent.png'],
            admin: [{ value: '' || false, disabled: this.disableAdminOnNew }],
            title: ['', Validators.compose([
                Validators.required,
                Validators.minLength(5)
            ])],
            uid: ['']
        });

        this.email = this.newUserForm.value.email;
        this.password = this.newUserForm.value.password;
        this.isOnline = this.newUserForm.value.isOnline;
        this.loginDate = Date.now();
        this.photoURL = this.newUserForm.value.photoURL;
        this.admin = this.newUserForm.value.admin;
        this.title = this.newUserForm.value.title;
        this.displayName = this.newUserForm.value.displayName;
        this.uid = this.newUserForm.value.uid;
    }

    onAddNewUser(formData: User) {
        if (!this.newUserForm.valid) {
            this.sbAlert.open('Something went wrong, user was not created.', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        } else {
            this.authService.addUser(formData)
                .then(() => {
                    this.sbAlert.open('User was created!', 'Dismiss', {
                        duration: 3000,
                        verticalPosition: 'bottom',
                        panelClass: ['snackbar-success']
                    });
                })
                .catch((error) => {
                    this.sbAlert.open(error, 'Dismiss', {
                        duration: 3000,
                        verticalPosition: 'bottom',
                        panelClass: ['snackbar-danger']
                    });
                });
            // console.log(`${newUser.email}, ${newUser.password}, ${newUser.admin}`);
            this.newUserForm.reset();

        }
    }


}
