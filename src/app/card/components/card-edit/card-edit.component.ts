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
    value: any;
    card: Card;
    author: string;
    id: string;
    imageUrl: string;
    isExtUrl: boolean;
    url: string;
    orderNumber: number;
    title: string;
    updatedAt: number = Date.now();

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
        this.id = this.route.snapshot.params['id'];
    }

    // For Form Validations
    get f() {
        return this.editCardForm.controls;
    }

    ngOnInit() {
        // Card1 Form:
        this.cardService.getPageCard(this.id).subscribe((card: Card) => {
            if (card) {
                this.card = card;

                this.editCardForm = this.fb.group({
                    author: [this.card.author || ''],
                    id: [this.card.id || ''],
                    imageUrl: [this.card.imageUrl || ''],
                    isExtUrl: [this.card.isExtUrl || false],
                    url: [this.card.url || ''],
                    orderNumber: [this.card.orderNumber || 0],
                    title: [this.card.title, Validators.required],
                    updatedAt: [Date.now()],
                });
            }

            this.author = this.editCardForm.value.author;
            this.id = this.editCardForm.value.id;
            this.imageUrl = this.editCardForm.value.imageUrl;
            this.isExtUrl = this.editCardForm.value.isExtUrl;
            this.url = this.editCardForm.value.url;
            this.orderNumber = this.editCardForm.value.orderNumber;
            this.title = this.editCardForm.value.title;
            this.updatedAt = this.editCardForm.value.updatedAt;
        });

    }

    onUpdatePageCard(formData: Card) {
        if (this.editCardForm.valid) {
            this.cardService.updatePageCard(formData, this.id);
            this.editCardForm.reset();
        } else {
            this.sbAlert.open('Form Data is invalid', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        }
    }

    onDeletePageCard(id: string, title: string) {
        this.cardService.deletePageCard(id, title);
    }
}
