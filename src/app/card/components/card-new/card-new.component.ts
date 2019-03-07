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
    selector: 'app-card-new',
    templateUrl: './card-new.component.html',
    styleUrls: ['./card-new.component.css']
})
export class CardNewComponent implements OnInit {
    newCardForm: FormGroup;
    // State for dropzone CSS toggling
    isHovering: boolean;
    isInvalid: boolean;
    value: any;
    card: Card = {
        author: '',
        id: '',
        imageUrl: '',
        isExtUrl: false,
        url: '',
        orderNumber: 0,
        title: '',
        updatedAt: Date.now(),
    };
    private author: string;
    private id: string;
    private imageUrl: string;
    private isExtUrl: boolean;
    private url: string;
    private orderNumber: number;
    private title: string;
    private updatedAt: number = Date.now();

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
    }

    // For Form Validations
    get f() {
        return this.newCardForm.controls;
    }


    ngOnInit() {
        this.newCardForm = this.fb.group({
            author: [''],
            id: [''],
            imageUrl: [''],
            isExtUrl: [false],
            url: [''],
            orderNumber: [0],
            title: ['', Validators.required],
            updatedAt: [Date.now()],
        });

        this.author = this.newCardForm.value.author;
        this.id = this.newCardForm.value.id;
        this.imageUrl = this.newCardForm.value.imageUrl;
        this.isExtUrl = this.newCardForm.value.isExtUrl;
        this.url = this.newCardForm.value.url;
        this.orderNumber = this.newCardForm.value.orderNumber;
        this.title = this.newCardForm.value.title;
        this.updatedAt = this.newCardForm.value.updatedAt;


    }

    onCreateCard(formData: Card) {
        if (!this.newCardForm.valid) {
            this.sbAlert.open('Form not valid', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        } else {
            this.cardService.setPageCard(formData)
                .then(() => this.newCardForm.reset())
                .catch((error) => console.log(error));
        }
    }


}
