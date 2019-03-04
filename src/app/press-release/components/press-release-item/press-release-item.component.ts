import { Component, Input, OnInit } from '@angular/core';
import { PressRelease } from '../../models/press-release';

@Component({
    selector: 'app-press-release-item',
    templateUrl: './press-release-item.component.html',
    styleUrls: ['./press-release-item.component.css']
})
export class PressReleaseItemComponent implements OnInit {
    @Input() pressRelease: PressRelease;

    constructor() {
    }

    ngOnInit() {
    }

}
