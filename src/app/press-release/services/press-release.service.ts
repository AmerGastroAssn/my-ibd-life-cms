import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PressRelease } from '../models/press-release';

@Injectable({
    providedIn: 'root'
})
export class PressReleaseService {
    pressReleaseCollection: AngularFirestoreCollection<PressRelease>;
    pressReleaseDoc: AngularFirestoreDocument<PressRelease>;
    pressRelease: Observable<PressRelease>;
    pressReleases$: Observable<PressRelease[]>;

    constructor(
        private readonly afs: AngularFirestore,
        private readonly router: Router,
    ) {

    }

    string_to_slug = (str) => {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
        const to = 'aaaaeeeeiiiioooouuuunc------';
        for (let i = 0, l = from.length; i < l; i += 1) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
                 .replace(/\s+/g, '-') // collapse whitespace and replace by -
                 .replace(/-+/g, '-'); // collapse dashes

        return str;
    };

    getAllPressReleases(): Observable<PressRelease[]> {
        return this.afs.collection<PressRelease>('pressReleases').valueChanges();
    }

    getPressReleases(): Observable<PressRelease[]> {
        // Ref, and order by title
        this.pressReleaseCollection = this.afs.collection(`pressReleases`,
            ref => ref.orderBy('title', 'asc')
        );
        // Gets array of pressReleases along with their uid.
        return this.pressReleaseCollection.snapshotChanges()
                   .map((changes) => {
                       return changes.map((a) => {
                           const data = a.payload.doc.data() as PressRelease;
                           data.url = a.payload.doc.id;
                           return data;
                       });
                   });
    }

    getPressRelease(url: string): Observable<PressRelease> {
        this.pressReleaseDoc = this.afs.doc<PressRelease>(`pressReleases/${url}`);
        this.pressRelease = this.pressReleaseDoc.snapshotChanges().pipe(
            map((action) => {
                if (action.payload.exists === false) {
                    return null;
                } else {
                    const data = action.payload.data() as PressRelease;
                    data.url = action.payload.id;
                    return data;
                }
            })
        );

        return this.pressRelease;
    }

    setPressRelease(formData) {
        const pubOnStampToNum = formData.publishOn.getTime();
        const newURL: string = this.string_to_slug(formData.title);
        const newId = this.afs.createId();
        // Creates new pressRelease with slug as the $key
        const pressReleaseRef: AngularFirestoreDocument<PressRelease> = this.afs.doc(`pressReleases/${newURL}`);
        const data: PressRelease = {
            $key: newURL,
            author: formData.author,
            createdAt: Date.now(),
            body: formData.body,
            sortOrder: formData.sortOrder,
            published: formData.published,
            publishOn: pubOnStampToNum,
            summary: formData.summary,
            title: formData.title,
            id: newId,
            updatedAt: Date.now(),
            url: newURL,
            metaDesc: formData.metaDesc,
        };

        return pressReleaseRef.set(data)
                              .then(() => this.router.navigate(['/press-releases']))
                              .catch((error) => console.error(`ERROR~aP: `, error));
    }


    updatePressRelease(formData) {
        const pressReleaseRef: AngularFirestoreDocument<PressRelease> = this.afs.doc(`pressReleases/${formData.url}`);
        const newId = this.afs.createId();
        if (typeof formData.publishOn === 'number') {
            const data: PressRelease = {
                author: formData.author,
                createdAt: formData.createdAt,
                body: formData.body,
                sortOrder: formData.sortOrder || '',
                published: formData.published,
                publishOn: formData.publishOn,
                summary: formData.summary || '',
                title: formData.title,
                metaDesc: formData.metaDesc || '',
                id: formData.id || newId,
                updatedAt: Date.now(),
                url: formData.url,
            };
            return pressReleaseRef.set(data, { merge: true })
                                  .then(() => this.router.navigate(['/press-releases']))
                                  .catch((error) => console.error(`ERROR~uPR: `, error));
        } else {
            const pubOnStampToNum = formData.publishOn.getTime();
            const data: PressRelease = {
                author: formData.author,
                createdAt: formData.createdAt,
                body: formData.body,
                sortOrder: formData.sortOrder || '',
                published: formData.published,
                publishOn: pubOnStampToNum,
                summary: formData.summary || '',
                title: formData.title,
                metaDesc: formData.metaDesc || '',
                id: formData.id || newId,
                updatedAt: Date.now(),
                url: formData.url,
            };
            return pressReleaseRef.set(data, { merge: true })
                                  .then(() => this.router.navigate(['/press-releases']))
                                  .catch((error) => console.error(`ERROR~uPR: `, error));
        }

    }


    deletePressRelease(id: string): void {
        this.pressReleaseDoc = this.afs.doc<PressRelease>(`pressReleases/${id}`);
        if (confirm(`Are you sure you want to delete this pressRelease? This is irreversible.`)) {
            this.pressReleaseDoc.delete()
                .then(() => this.router.navigate([`/press-releases`]))
                .catch((error) => console.error(`ERROR~dPR: `, error));
        }
    }

    getAllRegisterPressReleases(): Observable<PressRelease[]> {
        this.pressReleaseCollection = this.afs.collection('pressReleases', ref => {
            return ref.where('category', '==', 'register');
        });
        return this.pressReleases$ = this.pressReleaseCollection.valueChanges();
    }
}
