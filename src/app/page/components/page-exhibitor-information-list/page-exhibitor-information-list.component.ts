import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Page } from '../../models/page';
import { PageService } from '../../services/page.service';

@Component({
    selector: 'app-page-exhibitor-information-list',
    templateUrl: './page-exhibitor-information-list.component.html',
    styleUrls: ['./page-exhibitor-information-list.component.css']
})
export class PageExhibitorInformationListComponent implements OnInit {
    exPage$: Observable<Page[]>;

    constructor(
        private readonly pageService: PageService,
    ) {
    }

    ngOnInit() {
        this.exPage$ = this.pageService.getAllExhibitorPages();
    }
}
