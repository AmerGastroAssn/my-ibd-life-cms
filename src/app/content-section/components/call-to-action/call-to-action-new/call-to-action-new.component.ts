import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service';
import { ImageService } from '../../../../image/services/image.service';
import { User } from '../../../../user/modals/user';
import { CallToActionService } from '../../../services/call-to-action.service';

@Component({
    selector: 'app-call-to-action-new',
    templateUrl: './call-to-action-new.component.html',
    styleUrls: ['./call-to-action-new.component.css']
})
export class CallToActionNewComponent implements OnInit {
    newCTAForm: FormGroup;
    author: User;
    body: string;
    buttonUrl: string;
    buttonText: string;
    imageUrl: string;
    isExtUrl: boolean;
    published: boolean;
    name: string;
    subtitle: string;
    title: string;
    videoUrl: string;
    currentDate: number = Date.now();
    CkeditorConfig = {
        allowedContent: true,
        height: 200,
        extraAllowedContent: 'span;ul;li;table;td;style;*[id];*(*);*{*}',
    };

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private ctaService: CallToActionService,
        private storage: AngularFireStorage,
        private afs: AngularFirestore,
        private sbAlert: MatSnackBar,
        private imageService: ImageService,
        private authService: AuthService,
    ) {
        this.author = this.authService.getProfile();
        this.currentDate = Date.now();

        this.body = ``;
    }


    // For Form Validations
    get f() {
        return this.newCTAForm.controls;
    }


    ngOnInit() {
        this.newCTAForm = this.fb.group({
            author: [this.author],
            body: [this.body],
            buttonUrl: [this.buttonUrl || ''],
            buttonText: [this.buttonText || ''],
            imageUrl: [this.imageUrl || ''],
            isExtUrl: [this.isExtUrl || false],
            published: [this.published || false],
            name: [this.name, Validators.required],
            subtitle: [this.subtitle || ''],
            title: [this.title || ''],
            videoUrl: [this.videoUrl || ''],
        });


        this.author = this.newCTAForm.value.author;
        this.body = this.newCTAForm.value.body;
        this.buttonUrl = this.newCTAForm.value.buttonUrl;
        this.buttonText = this.newCTAForm.value.buttonText;
        this.imageUrl = this.newCTAForm.value.imageUrl;
        this.isExtUrl = this.newCTAForm.value.isExtUrl;
        this.name = this.newCTAForm.value.name;
        this.published = this.newCTAForm.value.published;
        this.subtitle = this.newCTAForm.value.subtitle;
        this.title = this.newCTAForm.value.title;
        this.videoUrl = this.newCTAForm.value.videoUrl;


    }

    onCreateCTA(formData: FormGroup) {
        if (!this.newCTAForm.valid) {
            this.sbAlert.open('Form not valid', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        } else {
            this.ctaService.setCTA(formData)
                .then(() => console.log('valid CTA Form'))
                .catch((error) => console.log(error));
        }
    }
}
