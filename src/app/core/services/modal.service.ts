import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Modal } from '../models/modal';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    modalDoc: AngularFirestoreDocument<Modal>;
    modal: Observable<Modal>;
    id: string;

    constructor(
        private afs: AngularFirestore,
        public sbAlert: MatSnackBar,
    ) {
        this.id = 'MamJbx8J2Sgw0VuyL3vs';
    }

    getModal(): Observable<Modal> {
        this.modalDoc = this.afs.doc<Modal>(`modal/${this.id}`);
        this.modal = this.modalDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as Modal;
                data.id = action.payload.id;
                return data;
            }
        });

        return this.modal;
    }

    updateModal(updatedModal): void {
        this.modalDoc = this.afs.doc<Modal>(`modal/${this.id}`);

        this.modalDoc.update(updatedModal)
            .then(() => {
                this.sbAlert.open('Alert Modal Saved!', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-success']
                });
                console.log('Alert Modal updated', updatedModal);
            })
            .catch((error) => {
                this.sbAlert.open('Alert Modal NOT Saved!', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-danger']
                });
                console.log(`ERROR~uM: `, error);
            });
    }
}
