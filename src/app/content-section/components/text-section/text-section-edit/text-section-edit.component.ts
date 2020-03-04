import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TextSection } from '../../../models/text-section';
import { TextSectionService } from '../../../services/text-section.service';

@Component({
    selector: 'app-text-section-edit',
    templateUrl: './text-section-edit.component.html',
    styleUrls: ['./text-section-edit.component.css']
})
export class TextSectionEditComponent implements OnInit {
    editTextSectionForm: FormGroup;
    textSection: TextSection;
    body: string;
    createdAt: number;
    id: string;
    name: string;
    published: boolean;
    CkeditorConfig = {
        allowedContent: true,
        height: 200,
        extraAllowedContent: 'script;span;ul;li;table;td;style;*[id];*(*);*{*}',
    };

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private textSectionService: TextSectionService,
        private storage: AngularFireStorage,
        private afs: AngularFirestore,
        private sbAlert: MatSnackBar,
    ) {
        this.id = route.snapshot.params['id'];
    }


    // For Form Validations
    get f() {
        return this.editTextSectionForm.controls;
    }


    ngOnInit() {
        this.textSectionService.getTextSection(this.id).subscribe((section) => {
            this.textSection = section;
            if (this.textSection !== null) {
                this.editTextSectionForm = this.fb.group({
                    body: [this.textSection.body,
                           Validators.compose([
                               Validators.required,
                               Validators.minLength(10)
                           ])
                    ],
                    createdAt: [this.textSection.createdAt],
                    id: [this.id],
                    name: [this.textSection.name, Validators.required],
                    published: [this.published || false],
                });

                this.body = this.editTextSectionForm.value.body;
                this.createdAt = this.editTextSectionForm.value.createdAt;
                this.id = this.editTextSectionForm.value.id;
                this.name = this.editTextSectionForm.value.name;
                this.published = this.editTextSectionForm.value.published;
            }
        });
    }

    onUpdateTextSection(formData: FormGroup) {
        if (!this.editTextSectionForm.valid) {
            this.sbAlert.open('Form not valid', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-warning']
            });
        } else {
            this.textSectionService.updateTextSection(formData)
                .then(() => console.log('valid Text Section Form'))
                .catch((error) => {
                    console.log(error);
                    this.sbAlert.open('Something went wrong. Please try refreshing the page.', 'Dismiss', {
                        duration: 3000,
                        verticalPosition: 'bottom',
                        panelClass: ['snackbar-danger']
                    });
                });
        }
    }
}
