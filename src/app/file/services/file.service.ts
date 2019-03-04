import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../user/modals/user';
import { File } from '../models/file';


@Injectable({
    providedIn: 'root'
})
export class FileService {
    fileCollection: AngularFirestoreCollection<File>;
    currentUser: User;
    category: string;


    constructor(
        private afs: AngularFirestore,
        private authService: AuthService,
    ) {
        this.currentUser = this.authService.getProfile();
    }

    getFiles(start, end) {
        return this.afs.collection('files',
            (ref) => ref.limit(10)
                        .orderBy('fileName')
                        .startAt(start).endAt(end)
        )
                   .valueChanges();
    }

    getFileByCreatedAt(): Observable<File[]> {
        this.fileCollection = this.afs.collection('files',
            ref => ref.orderBy('createdAt', 'desc').limit(25)
        );
        return this.fileCollection.valueChanges();
    }

    getFileBySortAmount(amount): Observable<File[]> {
        this.fileCollection = this.afs.collection('files',
            ref => ref.orderBy('createdAt', 'desc').limit(amount)
        );
        return this.fileCollection.valueChanges();
    }


    setFile(downloadURL, fileName, fileType) {
        const new$key = this.afs.createId();
        const currentDate = Date.now();

        const fileRef: AngularFirestoreDocument<File> = this.afs.doc(`files/${new$key}`);
        const data: File = {
            $key: new$key,
            uid: new$key,
            author: this.currentUser.email || '',
            category: '',
            fileName: fileName,
            fileType: fileType,
            createdAt: currentDate,
            url: downloadURL
        };

        return fileRef.set(data)
                      .then(() => console.log('File', data))
                      .catch((error) => console.log(`ERROR~sF: `, error));
    }
}
