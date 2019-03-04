import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-image-uploader',
    templateUrl: './image-uploader.component.html',
    styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit {
    favicon = 'fa fa-cloud-upload-alt';
    sectionName = 'Image Uploader';

    constructor() {
    }

    ngOnInit() {
    }


}
