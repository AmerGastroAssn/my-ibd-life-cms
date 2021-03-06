import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Card } from '../../../card/models/card';
import { CardService } from '../../../card/services/card.service';
import { Category } from '../../models/Category';
import { CategoryService } from '../../services/category.service';

@Component({
    selector: 'app-admin-category-new',
    templateUrl: './category-new.component.html',
    styleUrls: ['./category-new.component.css'],
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
export class CategoryNewComponent implements OnInit {
    newCatForm: FormGroup;
    category: Category;
    favicon = 'fa fa-folder-plus';
    sectionName = 'New Category';
    cards$: Observable<Card[]>;
    body: string;
    card1: string;
    card2: string;
    card3: string;
    card4: string;
    card5: string;
    card6: string;
    card7: string;
    card8: string;
    homepageImageUrl: string;
    imageUrl: string;
    name: string;
    showCards: boolean;

    constructor(
        private categoryService: CategoryService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private sbAlert: MatSnackBar,
        private cardService: CardService,
    ) {

        // New Category:
        this.newCatForm = this.fb.group({
            body: ['', Validators.required],
            card1: [''],
            card2: [''],
            card3: [''],
            card4: [''],
            card5: [''],
            card6: [''],
            card7: [''],
            card8: [''],
            homepageImageUrl: [''],
            imageUrl: [''],
            name: ['', Validators.required],
            showCards: ['' || false],
        });

        this.body = this.newCatForm.value.body;
        this.card1 = this.newCatForm.value.card1;
        this.card2 = this.newCatForm.value.card2;
        this.card3 = this.newCatForm.value.card3;
        this.card4 = this.newCatForm.value.card4;
        this.card5 = this.newCatForm.value.card5;
        this.card6 = this.newCatForm.value.card6;
        this.card7 = this.newCatForm.value.card7;
        this.card8 = this.newCatForm.value.card8;
        this.homepageImageUrl = this.newCatForm.value.homepageImageUrl;
        this.imageUrl = this.newCatForm.value.imageUrl;
        this.name = this.newCatForm.value.name;
        this.showCards = this.newCatForm.value.showCards;
    }


    ngOnInit(): void {
        this.cards$ = this.cardService.getAllCards();
    }

    // Reactive Form
    onCategoryCreate(categoryData: Category) {
        if (!this.newCatForm.valid) {
            this.sbAlert.open('Category form not valid', 'Dismiss', {
                duration: 3000,
                panelClass: ['snackbar-danger']
            });
        } else {
            this.categoryService.setCategory(categoryData);
            this.newCatForm.reset();
            this.sbAlert.open('Category created!', 'Dismiss', {
                duration: 3000,
                panelClass: ['snackbar-success']
            });
        }
    }


}
