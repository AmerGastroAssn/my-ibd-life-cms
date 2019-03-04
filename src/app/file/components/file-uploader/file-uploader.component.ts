import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {
    favicon = 'fa fa-cloud-upload';
    sectionName = 'File Uploader';

    constructor() {
    }

    ngOnInit() {
    }


}
