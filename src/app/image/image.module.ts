import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProgressbarModule } from 'ngx-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { ImageListComponent } from './components/image-list/image-list.component';
import { ImageUploaderItemComponent } from './components/image-uploader/image-uploader-item/image-uploader-item.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { ImageComponent } from './components/image.component';

import { ImageRoutingModule } from './image-routing.module';
import { ImageService } from './services/image.service';

@NgModule({
    declarations: [
        ImageComponent,
        ImageListComponent,
        ImageUploaderComponent,
        ImageUploaderItemComponent,
    ],
    imports: [
        CommonModule,
        ImageRoutingModule,
        FormsModule,
        MatSelectModule,
        MatTooltipModule,
        ProgressbarModule,
        SharedModule,
    ],
    providers: [
        ImageService
    ],
    exports: [
        ImageUploaderComponent,
        ImageUploaderItemComponent,
    ]
})
export class ImageModule {}
