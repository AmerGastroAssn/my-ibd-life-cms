import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
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
    favicon = 'fa fa-tag';
    sectionName = 'New Category';
    private showCards: boolean;
    private card1: string;
    private card2: string;
    private card3: string;
    private card4: string;
    private card5: string;
    private card6: string;
    private card7: string;
    private card8: string;
    private imageUrl: string;
    private name: string;

    constructor(
        private categoryService: CategoryService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private sbAlert: MatSnackBar,
    ) {

        // New Category:
        this.newCatForm = this.fb.group({
            card1: [''],
            card2: [''],
            card3: [''],
            card4: [''],
            card5: [''],
            card6: [''],
            card7: [''],
            card8: [''],
            imageUrl: [''],
            name: ['', Validators.required],
            showCards: [''],
        });

        this.card1 = this.newCatForm.value.card1;
        this.card2 = this.newCatForm.value.card2;
        this.card3 = this.newCatForm.value.card3;
        this.card4 = this.newCatForm.value.card4;
        this.card5 = this.newCatForm.value.card5;
        this.card6 = this.newCatForm.value.card6;
        this.card7 = this.newCatForm.value.card7;
        this.card8 = this.newCatForm.value.card8;
        this.imageUrl = this.newCatForm.value.imageUrl;
        this.name = this.newCatForm.value.name;
        this.showCards = this.newCatForm.value.showCards;
    }


    ngOnInit(): void {

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
