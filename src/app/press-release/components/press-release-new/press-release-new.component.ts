import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { AuthService } from '../../../auth/services/auth.service';
import { SettingsService } from '../../../core/services/settings.service';
import { User } from '../../../user/modals/user';
import { PressRelease } from '../../models/press-release';
import { PressReleaseService } from '../../services/press-release.service';

@Component({
    selector: 'app-press-release-new',
    templateUrl: './press-release-new.component.html',
    styleUrls: ['./press-release-new.component.css']
})
export class PressReleaseNewComponent implements OnInit {
    newPressReleaseForm: FormGroup;
    user: User;
    pressRelease: PressRelease;
    $key: string;
    author: string;
    createdAt: number;
    body: string;
    sortOrder: number;
    published: boolean;
    publishOn: any;
    summary: string;
    title: string;
    uid: string;
    url: string;
    bsConfig: Partial<BsDatepickerConfig>;
    metaDesc: string;
    currentDate: number;


    CkeditorConfig = {
        allowedContent: true,
        height: 400,
        extraAllowedContent: 'span;ul;li;table;td;style;*[id];*(*);*{*}',
    };

    constructor(
        private pressReleaseService: PressReleaseService,
        private router: Router,
        private route: ActivatedRoute,
        private flashMessage: FlashMessagesService,
        private fb: FormBuilder,
        private settingsService: SettingsService,
        private authService: AuthService,
        private storage: AngularFireStorage,
        private afs: AngularFirestore,
        private sbAlert: MatSnackBar,
    ) {
        this.authService.getAuth().subscribe((auth) => {
            if (auth) {
                this.author = auth.email;
            } else {
                this.author = this.authService.getProfile().email;
            }
        });

        this.uid = this.afs.createId();
        this.user = this.authService.getProfile();
        this.currentDate = Date.now();

        // Datepicker Config
        this.bsConfig = Object.assign({},
            {
                containerClass: 'theme-default',
                dateInputFormat: 'MMMM Do YYYY,h:mm a',
                placeholder: this.currentDate,
            });
    }

    // For Form Validations
    get f() {
        return this.newPressReleaseForm.controls;
    }


    ngOnInit() {
        // Form:
        this.newPressReleaseForm = this.fb.group({
            author: ['' || this.author],
            createdAt: [this.currentDate],
            body: ['', Validators.required],
            sortOrder: [''],
            published: ['' || false],
            publishOn: ['', Validators.required],
            summary: [''],
            title: ['', Validators.required],
            metaDesc: ['', Validators.required],
        });

        this.author = this.newPressReleaseForm.value.author;
        this.createdAt = this.newPressReleaseForm.value.createdAt;
        this.body = this.newPressReleaseForm.value.body;
        this.sortOrder = this.newPressReleaseForm.value.sortOrder;
        this.published = this.newPressReleaseForm.value.published;
        this.publishOn = this.newPressReleaseForm.value.publishOn;
        this.title = this.newPressReleaseForm.value.title;
        this.metaDesc = this.newPressReleaseForm.value.metaDesc;


    }

    onAddNewPressRelease(formData) {
        if (!this.newPressReleaseForm.valid) {
            this.sbAlert.open('Missing at least one input, Press Release was NOT created.', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        } else {
            this.pressReleaseService.setPressRelease(formData);
            this.newPressReleaseForm.reset();
            this.sbAlert.open('New Press Release created!', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-success']
            });
        }
    }

}
