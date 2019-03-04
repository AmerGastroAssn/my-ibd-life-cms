import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Page } from '../../models/page';
import { PageService } from '../../services/page.service';

@Component({
    selector: 'app-page-news-and-media-list',
    templateUrl: './page-news-and-media-list.component.html',
    styleUrls: ['./page-news-and-media-list.component.css']
})
export class PageNewsAndMediaListComponent implements OnInit {
    newsPage$: Observable<Page[]>;

    constructor(
        private readonly pageService: PageService,
    ) {
    }

    ngOnInit() {
        this.newsPage$ = this.pageService.getAllNewsPages();
    }
}
