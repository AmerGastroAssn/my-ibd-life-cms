import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomLink } from '../../models/custom-link';
import { CustomNavLinkService } from '../../services/custom-nav-link.service';

@Component({
    selector: 'app-custom-nav-link-edit',
    templateUrl: './custom-nav-link-edit.component.html',
    styleUrls: ['./custom-nav-link-edit.component.css'],
    animations: [
        // the fade-in/fade-out animation.
        trigger('simpleFadeAnimation', [

            // the "in" style determines the "resting" state of the element when it is visible.
            state('in', style({ opacity: 1 })),

            // fade in when created. this could also be written as transition('void => *')
            transition(':enter', [
                style({ opacity: 0 }),
                animate(600)
            ]),

            // fade out when destroyed. this could also be written as transition('void => *')
            transition(':leave',
                animate(300, style({ opacity: 0 })))
        ])
    ]
})
export class CustomNavLinkEditComponent implements OnInit {
    customLinkForm: FormGroup;
    customLink: CustomLink;
    uid: string;
    url1: string;
    url2: string;
    url3: string;
    url4: string;
    url5: string;
    text1: string;
    text2: string;
    text3: string;
    text4: string;
    text5: string;
    isExtURL1: boolean;
    isExtURL2: boolean;
    isExtURL3: boolean;
    isExtURL4: boolean;
    isExtURL5: boolean;
    imageUrl1: string;
    imageUrl2: string;
    imageUrl3: string;
    imageUrl4: string;
    imageUrl5: string;
    favicon = 'fa fa-link';
    sectionName = 'Nav Links';


    constructor(
        private fb: FormBuilder,
        private router: Router,
        private afs: AngularFirestore,
        private sbAlert: MatSnackBar,
        private customLinkService: CustomNavLinkService,
    ) {
    }

    // For Form Validations
    get f1() {
        return this.customLinkForm.controls;
    }


    ngOnInit() {
        this.customLinkService.getCustomLinks().subscribe((cl: CustomLink) => {
            if (cl) {
                this.customLink = cl;

                this.customLinkForm = this.fb.group({
                    url1: [this.customLink.url1],
                    url2: [this.customLink.url2],
                    url3: [this.customLink.url3],
                    url4: [this.customLink.url4],
                    url5: [this.customLink.url5],
                    text1: [this.customLink.text1],
                    text2: [this.customLink.text2],
                    text3: [this.customLink.text3],
                    text4: [this.customLink.text4],
                    text5: [this.customLink.text5],
                    isExtURL1: [this.customLink.isExtURL1 || false],
                    isExtURL2: [this.customLink.isExtURL2 || false],
                    isExtURL3: [this.customLink.isExtURL3 || false],
                    isExtURL4: [this.customLink.isExtURL4 || false],
                    isExtURL5: [this.customLink.isExtURL5 || false],
                    imageUrl1: [this.customLink.imageUrl1 || ''],
                    imageUrl2: [this.customLink.imageUrl2 || ''],
                    imageUrl3: [this.customLink.imageUrl3 || ''],
                    imageUrl4: [this.customLink.imageUrl4 || ''],
                    imageUrl5: [this.customLink.imageUrl5 || ''],
                });

                this.url1 = this.customLinkForm.value.url1;
                this.url2 = this.customLinkForm.value.url2;
                this.url3 = this.customLinkForm.value.url3;
                this.url4 = this.customLinkForm.value.url4;
                this.url5 = this.customLinkForm.value.url5;
                this.text1 = this.customLinkForm.value.text1;
                this.text2 = this.customLinkForm.value.text2;
                this.text3 = this.customLinkForm.value.text3;
                this.text4 = this.customLinkForm.value.text4;
                this.text5 = this.customLinkForm.value.text5;
                this.isExtURL1 = this.customLinkForm.value.isExtURL1;
                this.isExtURL2 = this.customLinkForm.value.isExtURL2;
                this.isExtURL3 = this.customLinkForm.value.isExtURL3;
                this.isExtURL4 = this.customLinkForm.value.isExtURL4;
                this.isExtURL5 = this.customLinkForm.value.isExtURL5;
                this.imageUrl1 = this.customLinkForm.value.imageUrl1;
                this.imageUrl2 = this.customLinkForm.value.imageUrl2;
                this.imageUrl3 = this.customLinkForm.value.imageUrl3;
                this.imageUrl4 = this.customLinkForm.value.imageUrl4;
                this.imageUrl5 = this.customLinkForm.value.imageUrl5;

            }
        });
    }

    onUpdateCustomLinks(formData: CustomLink) {
        if (!this.customLinkForm.valid) {
            this.sbAlert.open('Data is not valid, Links were not saved.', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        } else {
            this.customLinkService.updateCustomLink(formData);
            this.customLinkForm.reset();
        }
    }

}
