import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { AuthService } from '../../../auth/services/auth.service';
import { SettingsService } from '../../../core/services/settings.service';
import { User } from '../../../user/modals/user';
import { PressRelease } from '../../models/press-release';
import { PressReleaseService } from '../../services/press-release.service';


@Component({
    selector: 'app-press-release-edit',
    templateUrl: './press-release-edit.component.html',
    styleUrls: ['./press-release-edit.component.css']
})
export class PressReleaseEditComponent implements OnInit {
    editPressReleaseForm: FormGroup;
    user: User;
    pressRelease: PressRelease;
    author: string;
    createdAt: number;
    body: string;
    sortOrder: number;
    published: boolean;
    publishOn: any;
    summary: string;
    title: string;
    id: string;
    url: string;
    bsConfig: Partial<BsDatepickerConfig>;
    currentDate: number;
    placeholderDate: any;
    metaDesc: string;


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
        // Get id from url
        this.url = this.route.snapshot.params['id'];

        this.authService.getAuth().subscribe((auth) => {
            if (auth) {
                this.author = auth.email;
            } else {
                this.author = this.authService.getProfile().email;
            }
        });

        this.user = this.authService.getProfile();
        this.currentDate = Date.now();

        // Datepicker Config
        this.bsConfig = Object.assign({},
            {
                containerClass: 'theme-default',
                dateInputFormat: 'MMMM Do YYYY,h:mm',
                placeholder: this.currentDate
            });
    }

    // For Form Validations
    get f() {
        return this.editPressReleaseForm.controls;
    }


    ngOnInit() {
        // Get Page
        this.pressReleaseService.getPressRelease(this.url).subscribe((pr: PressRelease) => {
            if (pr) {
                this.pressRelease = pr;
                const newURL: string = this.pressReleaseService.string_to_slug(pr.title);

                // Form:
                this.editPressReleaseForm = this.fb.group({
                    author: [pr.author],
                    createdAt: [this.currentDate],
                    body: [pr.body, Validators.required],
                    sortOrder: [pr.sortOrder],
                    published: [pr.published || false],
                    publishOn: [pr.publishOn, Validators.required],
                    summary: [pr.summary],
                    title: [pr.title, Validators.required],
                    metaDesc: [pr.metaDesc],
                    url: [pr.url],
                });


                this.author = this.editPressReleaseForm.value.author;
                this.createdAt = this.editPressReleaseForm.value.createdAt;
                this.body = this.editPressReleaseForm.value.body;
                this.sortOrder = this.editPressReleaseForm.value.sortOrder;
                this.published = this.editPressReleaseForm.value.published;
                this.publishOn = this.editPressReleaseForm.value.publishOn;
                this.title = this.editPressReleaseForm.value.title;
                this.id = this.pressRelease.id;
                this.url = this.pressRelease.url;
                this.metaDesc = this.pressRelease.metaDesc;
            }
        });

    }

    onUpdatePressRelease(formData: PressRelease) {
        if (!this.editPressReleaseForm.valid) {
            this.sbAlert.open('Missing at least one input, Press Release was NOT updated.', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        } else {
            this.pressReleaseService.updatePressRelease(formData);
            this.editPressReleaseForm.reset();
            this.sbAlert.open('Press Release updated!', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-success']
            });
        }
    }

}
