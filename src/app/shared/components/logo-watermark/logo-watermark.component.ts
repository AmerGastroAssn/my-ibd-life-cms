import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-logo-watermark',
    templateUrl: './logo-watermark.component.html',
    styleUrls: ['./logo-watermark.component.css']
})
export class LogoWatermarkComponent implements OnInit {
    @Input() favicon: string;
    @Input() sectionName: string;
    logo: string;

    constructor() {
        this.logo = `https://firebasestorage.googleapis.com/v0/b/my-ibd-life-dev.appspot.com/o/images%2F2019%2F1551821388572_my_ibd_life_logo_500.png?alt=media&token=7fe237dc-fe29-42fc-8031-210e0db40b52`;
    }

    ngOnInit() {
    }

}
