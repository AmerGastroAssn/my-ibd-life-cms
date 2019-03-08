import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { HelperService } from '../../shared/services/helper.service';
import { Category } from '../models/Category';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    categoryCollection: AngularFirestoreCollection<Category>;
    categoryDoc: AngularFirestoreDocument<Category>;
    category$: Observable<Category>;
    categories$: Observable<Category[]>;
    id: string;


    constructor(
        private afs: AngularFirestore,
        private router: Router,
        public sbAlert: MatSnackBar,
        private authService: AuthService,
        private helperService: HelperService,
    ) {

    }

    getAllCategories(): Observable<Category[]> {
        this.categoryCollection = this.afs.collection<Category>('categories');
        return this.categoryCollection.valueChanges();
    }

    getCategoryByTitle(title: string): Observable<Category[]> {
        this.categoryCollection = this.afs.collection<Category>('categories', ref => {
            return ref.where('title', '==', `${title}`);
        });
        return this.categories$ = this.categoryCollection.valueChanges();
    }

    getCategory(id: string): Observable<Category> {
        this.categoryDoc = this.afs.doc<Category>(`categories/${id}`);
        this.category$ = this.categoryDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as Category;
                data.id = action.payload.id;
                return data;
            }
        });
        return this.category$;
    }


    updateCategory(formData): object {
        const calRef: AngularFirestoreDocument<Category> = this.afs.doc(`categories/${formData.id}`);
        const slug = this.helperService.stringToSlug(formData.name);
        const data: Category = {
            authorId: this.authService.getProfile().uid,
            body: formData.body,
            card1: formData.card1,
            card2: formData.card2,
            card3: formData.card3,
            card4: formData.card4,
            card5: formData.card5,
            card6: formData.card6,
            card7: formData.card7,
            card8: formData.card8,
            id: formData.id,
            imageUrl: formData.imageUrl,
            name: formData.name,
            showCards: formData.showCards || false,
            slug: slug,
            updatedAt: Date.now(),
        };

        console.log('data', data);
        return calRef.set(data, { merge: true })
                     .then(() => {
                         this.router.navigate(['/categories']);
                         this.sbAlert.open('Category Updated!', 'Dismiss', {
                             duration: 3000,
                             verticalPosition: 'bottom',
                             panelClass: ['snackbar-success']
                         });
                         console.log('Category Updated!', data);
                     })
                     .catch((error) => console.log(`ERROR~uC: `, error));
    }

    setCategory(formData): object {
        const newId = this.afs.createId();
        const calRef: AngularFirestoreDocument<Category> = this.afs.doc(`categories/${newId}`);
        const slug = this.helperService.stringToSlug(formData.name);
        const data: Category = {
            authorId: this.authService.getProfile().uid,
            body: formData.body,
            card1: formData.card1,
            card2: formData.card2,
            card3: formData.card3,
            card4: formData.card4,
            card5: formData.card5,
            card6: formData.card6,
            card7: formData.card7,
            card8: formData.card8,
            id: newId,
            imageUrl: formData.imageUrl,
            name: formData.name,
            showCards: formData.showCards || false,
            slug: slug,
            updatedAt: Date.now(),
        };

        console.log('data', data);
        return calRef.set(data)
                     .then(() => {
                         this.router.navigate(['/categories']);
                         this.sbAlert.open('Category was Updated!', 'Dismiss', {
                             duration: 3000,
                             verticalPosition: 'bottom',
                             panelClass: ['snackbar-success']
                         });
                         console.log('Category Saved!', data);
                     })
                     .catch((error) => console.log(`ERROR~uC: `, error));
    }


}
