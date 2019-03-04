import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Page } from '../../models/page';
import { PageService } from '../../services/page.service';

@Component({
    selector: 'app-page-register-list',
    templateUrl: './page-register-list.component.html',
    styleUrls: ['./page-register-list.component.css']
})
export class PageRegisterListComponent implements OnInit {
    regPage$: Observable<Page[]>;

    constructor(
        private readonly pageService: PageService,
    ) {
    }

    ngOnInit() {
        this.regPage$ = this.pageService.getAllRegisterPages();
    }

}
