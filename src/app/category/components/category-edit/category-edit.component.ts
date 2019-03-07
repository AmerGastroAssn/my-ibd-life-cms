import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Card } from '../../../card/models/card';
import { CardService } from '../../../card/services/card.service';
import { CalColumnValues } from '../../models/CalColumnValues';
import { Category } from '../../models/Category';
import { CategoryService } from '../../services/category.service';

@Component({
    selector: 'app-category-edit',
    templateUrl: './category-edit.component.html',
    styleUrls: ['./category-edit.component.css'],
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
export class CategoryEditComponent implements OnInit {
    updateCatForm: FormGroup;
    // @ViewChild('colVF') colVF: NgForm;
    category: Category;
    calColumnValues: CalColumnValues;
    favicon = 'fa fa-pencil-alt';
    sectionName = 'Edit Category';
    private authorId: string;
    private card1: string;
    private card2: string;
    private card3: string;
    private card4: string;
    private card5: string;
    private card6: string;
    private card7: string;
    private card8: string;
    private id: string;
    private imageUrl: string;
    private name: string;
    private showCards: boolean;
    private cards$: Observable<Card[]>;

    constructor(
        private categoryService: CategoryService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private sbAlert: MatSnackBar,
        private cardService: CardService,
    ) {
        // Get id from url
        this.id = this.route.snapshot.params['id'];

        // Edit Category:
        this.categoryService.getCategory(this.id).subscribe((category: Category) => {
            if (category !== null) {
                this.category = category;

                this.updateCatForm = this.fb.group({
                    authorId: [this.category.authorId],
                    card1: [this.category.card1 || ''],
                    card2: [this.category.card2 || ''],
                    card3: [this.category.card3 || ''],
                    card4: [this.category.card4 || ''],
                    card5: [this.category.card5 || ''],
                    card6: [this.category.card6 || ''],
                    card7: [this.category.card7 || ''],
                    card8: [this.category.card8 || ''],
                    id: [this.id],
                    imageUrl: [this.category.imageUrl || ''],
                    name: [this.category.name, Validators.required],
                    showCards: [this.category.showCards],
                });

                this.authorId = this.updateCatForm.value.authorId;
                this.card1 = this.updateCatForm.value.card1;
                this.card2 = this.updateCatForm.value.card2;
                this.card3 = this.updateCatForm.value.card3;
                this.card4 = this.updateCatForm.value.card4;
                this.card5 = this.updateCatForm.value.card5;
                this.card6 = this.updateCatForm.value.card6;
                this.card7 = this.updateCatForm.value.card7;
                this.card8 = this.updateCatForm.value.card8;
                this.id = this.updateCatForm.value.id;
                this.imageUrl = this.updateCatForm.value.imageUrl;
                this.name = this.updateCatForm.value.name;
                this.showCards = this.updateCatForm.value.showCards;

            }
        });


    }

    ngOnInit() {
        this.categoryService.getCategory(this.id)
            .subscribe((calInfo) => {
                this.category = calInfo;
            });

        this.cards$ = this.cardService.getAllCards();
    }


    // Reactive Form
    onCategoryUpdate(categoryData) {
        if (!this.updateCatForm.valid) {
            this.sbAlert.open('The Title, Date 1 and Body 1 must be filled out, Event was NOT created.', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        } else {
            this.categoryService.updateCategory(categoryData);
            console.log(categoryData);
            this.updateCatForm.reset();
            this.sbAlert.open('Category Updated!', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-success']
            });
        }
    }


}
