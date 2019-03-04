import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../modals/user';

@Component({
    selector: 'app-admin-user-item',
    templateUrl: './user-item.component.html',
    styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
    @Input() user: User;
    @Input() index: number;

    constructor() {
    }

    ngOnInit() {
    }

}
