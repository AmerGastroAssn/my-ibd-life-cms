import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule, MatTooltipModule } from '@angular/material';
import { ProgressbarModule } from 'ngx-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { FileListComponent } from './components/file-list/file-list.component';
import { FileUploaderItemComponent } from './components/file-uploader/file-uploader-item/file-uploader-item.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { FileComponent } from './components/file.component';

import { FileRoutingModule } from './file-routing.module';
import { FileService } from './services/file.service';

@NgModule({
    declarations: [
        FileComponent,
        FileListComponent,
        FileUploaderComponent,
        FileUploaderItemComponent,
    ],
    imports: [
        CommonModule,
        FileRoutingModule,
        FormsModule,
        MatSelectModule,
        MatTooltipModule,
        ProgressbarModule,
        SharedModule,
    ],
    providers: [
        FileService,
    ],
    exports: [
        FileUploaderItemComponent,
    ]
})
export class FileModule {}
