import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileService } from '../../../services/file.service';


@Component({
    selector: 'app-file-uploader-item',
    templateUrl: './file-uploader-item.component.html',
    styleUrls: ['./file-uploader-item.component.css']
})
export class FileUploaderItemComponent implements OnInit {
    // File upload
    task: AngularFireUploadTask;
    // Progress monitoring
    percentage: Observable<number>;
    snapshot: Observable<any>;
    // Download URL
    downloadURL: Observable<string>;
    isInvalid: boolean;
    fileType: string;

    constructor(
        private storage: AngularFireStorage,
        private sbAlert: MatSnackBar,
        private fileService: FileService,
    ) {
    }

    uploadFile(event) {
        const customMetadata = { app: 'MyIBD Life' };
        // The File object
        const file = event.target.files[0];
        // Client-side validation example
        this.fileType = file.name.split('.').pop();
        if (
            this.fileType === 'pdf' ||
            this.fileType === 'xls' ||
            this.fileType === 'xlsx' ||
            this.fileType === 'doc' ||
            this.fileType === 'docx' ||
            this.fileType === 'pptx' ||
            this.fileType === 'ppt'
        ) {
            // The storage path
            const path = `files/${(new Date()).getFullYear()}/${new Date().getTime()}_${file.name.replace(/\s/g, '_').toLowerCase()}`;
            const fileRef = this.storage.ref(path);
            // The main task
            this.task = this.storage.upload(path, file, { customMetadata });
            // Progress monitoring
            this.percentage = this.task.percentageChanges();
            this.snapshot = this.task.snapshotChanges();
            // The file's download URL
            this.task.snapshotChanges().pipe(
                finalize(() => {
                    this.downloadURL = fileRef.getDownloadURL();
                    this.downloadURL.subscribe((fileURL) => {
                        this.fileService.setFile(
                            fileURL,
                            file.name.replace(/\s/g, '_').toLowerCase(),
                            this.fileType
                        )
                            .then(() => {
                                this.sbAlert.open('File has been added!', 'Dismiss', {
                                    duration: 3000,
                                    verticalPosition: 'bottom',
                                    panelClass: ['snackbar-success']
                                });
                            })
                            .catch((error) => console.log('Problem sending file to service', error));
                    });


                })
            )
                .subscribe();
        } else {
            this.sbAlert.open(`${this.fileType} is not supported :(`, 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
            console.error(`${this.fileType} is an unsupported file type :( `);
            this.isInvalid = true;
            return;
        }

    }

    ngOnInit() {
    }
}
