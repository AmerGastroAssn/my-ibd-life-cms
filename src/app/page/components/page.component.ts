import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
    selector: 'app-pages',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

    constructor(
        private authService: AuthService
    ) {
    }

    ngOnInit() {

    }

}
