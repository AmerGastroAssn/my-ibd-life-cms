import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../../../image/services/image.service';
import { PageService } from '../../../page/services/page.service';
import { Card } from '../../models/card';
import { CardService } from '../../services/card.service';


@Component({
    selector: 'app-card-edit',
    templateUrl: './card-edit.component.html',
    styleUrls: ['./card-edit.component.css'],
    animations: [
        // the fade-in/fade-out animation.
        trigger('simpleFadeAnimation', [

            // the "in" style determines the "resting" state of the element when it is visible.
            state('in', style({ opacity: 1 })),

            // fade in when created. this could also be written as transition('void => *')
            transition(':enter', [
                style({ opacity: 0 }),
                animate(500)
            ]),

            // fade out when destroyed. this could also be written as transition('void => *')
            transition(':leave',
                animate(300, style({ opacity: 0 })))
        ])
    ]
})
export class CardEditComponent implements OnInit {
    editCardForm: FormGroup;
    card: Card;
    photoURL: string;
    title: string;
    body: string;
    buttonString: string;
    url: string;
    orderNumber: number;
    id: string;
    $key: string;
    isExtURL: boolean;
    // State for dropzone CSS toggling
    isHovering: boolean;
    isInvalid: boolean;
    value: any;


    constructor(
        private pageService: PageService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private cardService: CardService,
        private storage: AngularFireStorage,
        private afs: AngularFirestore,
        private sbAlert: MatSnackBar,
        private imageService: ImageService,
    ) {
        // Get id from url
        this.$key = this.route.snapshot.params['id'];
    }

    // For Form Validations
    get f() {
        return this.editCardForm.controls;
    }

    ngOnInit() {
        // Card1 Form:
        this.cardService.getPageCard(this.$key).subscribe((card) => {
            this.card = card;

            this.editCardForm = this.fb.group({
                orderNumber: [this.card.orderNumber || ''],
                title: [this.card.title,
                        Validators.compose([
                            Validators.required, Validators.minLength(3)
                        ])
                ],
                body: [this.card.body,
                       Validators.compose([
                           Validators.required, Validators.minLength(10)
                       ])
                ],
                photoURL: [this.card.photoURL, Validators.required],
                buttonString: [this.card.buttonString, Validators.required],
                url: [this.card.url],
                isExtURL: [this.card.isExtURL || false],
            });

            this.orderNumber = this.editCardForm.value.orderNumber;
            this.title = this.editCardForm.value.title;
            this.body = this.editCardForm.value.body;
            this.photoURL = this.editCardForm.value.photoURL;
            this.buttonString = this.editCardForm.value.buttonString;
            this.url = this.editCardForm.value.url;
            this.isExtURL = this.editCardForm.value.isExtURL;
        });

    }

    onUpdatePageCard(formData: Card) {
        if (this.editCardForm.valid) {
            this.cardService.updatePageCard(formData, this.$key);
            this.editCardForm.reset();
        } else {
            this.sbAlert.open('Form Data is invalid', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        }
    }

    onDeletePageCard(id, title) {
        this.cardService.deletePageCard(id, title);
    }
}
