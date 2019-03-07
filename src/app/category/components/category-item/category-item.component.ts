import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../models/Category';


@Component({
    selector: 'app-category-item',
    templateUrl: './category-item.component.html',
    styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {
    @Input() category: Category;
    $key: string;
    body1: string;
    body2: string;
    body3: string;
    body4: string;
    date1: number;
    date2: number;
    date3: number;
    date4: number;
    title: string;
    uid: string;
    month: string;
    month2: string;
    month3: string;
    month4: string;

    constructor() {
    }

    ngOnInit(): void {
    }


}
