import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-analytics-dashboard',
    templateUrl: './analytics-dashboard.component.html',
    styleUrls: ['./analytics-dashboard.component.css']
})
export class AnalyticsDashboardComponent implements OnInit {
    googleUrl: any;
    url: string;
    favicon = 'fa fa-chart-pie';
    sectionName = 'Analytics';

    constructor(
        private sanitizer: DomSanitizer,
    ) {
        this.url = `https://datastudio.google.com/embed/reporting/15sWOduMA0tqY-oMkfpGtHjd35r4A5GuY/page/1M`;
    }

    ngOnInit() {
        this.googleUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    }

}
