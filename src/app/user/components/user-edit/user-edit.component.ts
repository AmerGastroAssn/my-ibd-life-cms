import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';
import { ImageService } from '../../../image/services/image.service';
import { SettingsService } from '../../../core/services/settings.service';
import { User } from '../../modals/user';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-admin-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
    user: User;
    editUserForm: FormGroup;
    email: string;
    password: string;
    isOnline: boolean;
    loginDate: number = Date.now();
    photoURL: string;
    admin: boolean;
    displayName: string;
    title: string;
    uid: string;
    disableAdminOnEdit: boolean;
    isAdmin: boolean;
    // Image upload
    task: AngularFireUploadTask;
    // Progress monitoring
    percentage: Observable<number>;
    snapshot: Observable<any>;
    // Download URL
    downloadURL: Observable<string>;
    // State for dropzone CSS toggling
    isHovering: boolean;
    isInvalid: boolean;

    constructor(
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private flashMessage: FlashMessagesService,
        private fb: FormBuilder,
        private settingsService: SettingsService,
        private afAuth: AngularFireAuth,
        private sbAlert: MatSnackBar,
        private storage: AngularFireStorage,
        private imageService: ImageService,
    ) {
    }

    // For Form Validations
    get f() {
        return this.editUserForm.controls;
    }

    uploadImage(event) {
        const customMetadata = { app: 'MyIBD Life' };
        // The File object
        const file = event.target.files[0];
        // Client-side validation example
        if (file.type.split('/')[0] !== 'image') {
            this.sbAlert.open('That file type is not supported :(', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
            console.error('unsupported file type :( ');
            this.isInvalid = true;
            return;
        }
        // The storage path
        const path = `pageImages/${new Date().getTime()}_${file.name.replace(/\s/g, '_').toLowerCase()}`;
        const fileRef = this.storage.ref(path);
        // The main task
        this.task = this.storage.upload(path, file, { customMetadata });
        // Progress monitoring
        this.percentage = this.task.percentageChanges();
        this.snapshot = this.task.snapshotChanges();
        // The file's download URL
        this.task.snapshotChanges().pipe(
            finalize(() => {
                this.downloadURL = fileRef.getDownloadURL();
                this.downloadURL.subscribe((imageURL) => {
                    this.imageService.setImage(imageURL, file.name.replace(/\s/g, '_').toLowerCase())
                        .then(() => {
                            this.sbAlert.open('Image has been added!', 'Dismiss', {
                                duration: 3000,
                                verticalPosition: 'bottom',
                                panelClass: ['snackbar-success']
                            });
                        })
                        .catch((error) => console.log('Problem sending image to service', error));
                });


            })
        )
            .subscribe();
    }

    ngOnInit() {
        // Settings
        this.disableAdminOnEdit = this.settingsService.getAdminSettings().disableAdmin;
        console.log('disableAdmin', this.disableAdminOnEdit);

        // Get id from url
        this.uid = this.route.snapshot.params['id'];
        // Get User
        this.userService.getUser(this.uid).subscribe((user) => {
            if (user !== null) {
                this.user = user;

                // Form:
                this.editUserForm = this.fb.group({
                    email: [{ value: this.user.email, disabled: this.disableAdminOnEdit },
                        Validators.compose([
                            Validators.required, Validators.email
                        ])
                    ],
                    displayName: [this.user.displayName, Validators.required],
                    isOnline: [this.user.isOnline],
                    loginDate: [Date.now()],
                    photoURL: [this.user.photoURL || 'https://s3.amazonaws.com/DDW/ddw-org/images/avatar_transparent.png'],
                    admin: [{ value: this.user.admin || false, disabled: this.disableAdminOnEdit }],
                    title: [this.user.title,
                            Validators.compose([
                                Validators.required, Validators.minLength(5)
                            ])
                    ],
                });

                this.email = this.editUserForm.value.email;
                this.displayName = this.editUserForm.value.displayName;
                this.isOnline = this.editUserForm.value.isOnline;
                this.loginDate = this.editUserForm.value.loginDate;
                this.photoURL = this.editUserForm.value.photoURL;
                this.admin = this.editUserForm.value.admin;
                this.title = this.editUserForm.value.title;
            }
        });

        // Is Admin?
        // this.userService.getUsersInfo()
        //     .subscribe((userArr) => {
        //         userArr.forEach((userInfo) => {
        //             if (this.afAuth.auth.currentUser.email === userInfo.email) {
        //                 if (userInfo.admin === true) {
        //                     this.isAdmin = true;
        //                 } else {
        //                     this.isAdmin = false;
        //                 }
        //             }
        //         });
        //     });
    }

    onUpdateUser(formData) {
        if (!this.editUserForm.valid) {
            this.sbAlert.open('Something went wrong, user was not updated', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        } else {
            this.userService.updateUser(formData, this.user.uid);
            this.editUserForm.reset();
        }
    }

    onDeleteUser() {
        this.userService.deleteUser(this.uid);
    }

}
