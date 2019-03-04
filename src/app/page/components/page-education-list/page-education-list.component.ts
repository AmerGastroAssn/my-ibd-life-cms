import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Page } from '../../models/page';
import { PageService } from '../../services/page.service';

@Component({
    selector: 'app-page-education-list',
    templateUrl: './page-education-list.component.html',
    styleUrls: ['./page-education-list.component.css']
})
export class PageEducationListComponent implements OnInit {
    edPage$: Observable<Page[]>;

    constructor(
        private readonly pageService: PageService,
    ) {
    }

    ngOnInit() {
        this.edPage$ = this.pageService.getAllEducationPages();
    }
}
