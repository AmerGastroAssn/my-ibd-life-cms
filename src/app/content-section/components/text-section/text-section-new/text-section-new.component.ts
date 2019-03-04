import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TextSectionService } from '../../../services/text-section.service';

@Component({
    selector: 'app-text-section-new',
    templateUrl: './text-section-new.component.html',
    styleUrls: ['./text-section-new.component.css']
})
export class TextSectionNewComponent implements OnInit {
    newTextSectionForm: FormGroup;
    name: string;
    published: boolean;
    CkeditorConfig = {
        allowedContent: true,
        height: 200,
        extraAllowedContent: 'span;ul;li;table;td;style;*[id];*(*);*{*}',
        extraPlugins: 'codesnippet',
        codeSnippet_theme: 'monokai_sublime',
    };
    // tslint:disable-next-line:max-line-length
    body = `<h1>##H1 Header</h1> <h2>##H2 Header</h2> <h3>##H3 Header</h3>  <p>##This is some body Paragraph Copy Please remember to delete the pound signs before saving.</p><p>##This is some body Paragraph Copy Please remember to delete the pound signs before saving.</p> <ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul> <ol><li>Item One</li><li>Item Two</li><li>Item Three</li></ol><h1>##H1 Header</h1> <h2>##H2 Header</h2> <h3>##H3 Header</h3> <p>##This is some body Paragraph Copy Please remember to delete the pound signs before saving.</p><p>##This is some body Paragraph Copy Please remember to delete the pound signs before saving.</p> <ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul> <ol><li>Item One</li><li>Item Two</li><li>Item Three</li></ol>`;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private textSectionService: TextSectionService,
        private storage: AngularFireStorage,
        private afs: AngularFirestore,
        private sbAlert: MatSnackBar,
    ) {

    }


    // For Form Validations
    get f() {
        return this.newTextSectionForm.controls;
    }


    ngOnInit() {
        this.newTextSectionForm = this.fb.group({
            body: [this.body,
                   Validators.compose([
                       Validators.required,
                       Validators.minLength(10)
                   ])
            ],
            name: [this.name, Validators.required],
            published: [this.published || false]
        });

        this.body = this.newTextSectionForm.value.body;
        this.name = this.newTextSectionForm.value.name;
        this.published = this.newTextSectionForm.value.published;
    }

    onCreateTextSection(formData: FormGroup) {
        if (!this.newTextSectionForm.valid) {
            this.sbAlert.open('Form not valid', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-warning']
            });
        } else {
            this.textSectionService.setTextSection(formData)
                .then(() => console.log('valid Text Section Form'))
                .catch((error) => {
                    console.log(error);
                    this.sbAlert.open('Something went wrong. Please copy the text from the body and try refreshing the page.', 'Dismiss', {
                        duration: 3000,
                        verticalPosition: 'bottom',
                        panelClass: ['snackbar-danger']
                    });
                });
        }
    }
}
