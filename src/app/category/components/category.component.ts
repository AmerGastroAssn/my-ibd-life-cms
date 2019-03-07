import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';
import { CategoryService } from '../services/category.service';

@Component({
    selector: 'app-admin-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
    categoryEvents$: Observable<Category[]>;
    day: string;

    constructor(
        readonly categoryService: CategoryService,
    ) {
    }

    ngOnInit() {
        this.categoryEvents$ = this.categoryService.getAllCategories();
    }
}
