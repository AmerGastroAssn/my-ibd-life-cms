import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Page } from '../../models/page';
import { PageService } from '../../services/page.service';

@Component({
    selector: 'app-page-presenters-list',
    templateUrl: './page-presenters-list.component.html',
    styleUrls: ['./page-presenters-list.component.css']
})
export class PagePresentersListComponent implements OnInit {
    presPage$: Observable<Page[]>;

    constructor(
        private readonly pageService: PageService,
    ) {
    }

    ngOnInit() {
        this.presPage$ = this.pageService.getAllPresenterPages();
    }
}
