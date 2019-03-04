import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { BlogPost } from '../models/blog-post';


@Injectable({
    providedIn: 'root'
})
export class BlogPostService {
    blogPostCollection: AngularFirestoreCollection<BlogPost>;
    blogPostDoc: AngularFirestoreDocument<BlogPost>;
    blogPost$: Observable<BlogPost>;
    blogPosts$: Observable<BlogPost[]>;
    loggedInUser: string;
    uid: string;

    constructor(
        private afs: AngularFirestore,
        private router: Router,
        public sbAlert: MatSnackBar,
        private authService: AuthService,
    ) {
        this.authService.getAuth().subscribe((auth) => {
            if (auth) {
                this.loggedInUser = auth.email;
                this.uid = auth.uid;
            } else {
                return of(null);
            }
        });
    }

    getAllPosts(): Observable<BlogPost[]> {
        this.blogPostCollection = this.afs.collection<BlogPost>('blogPosts', (ref) => {
            return ref.orderBy('title', 'asc');
        });
        return this.blogPostCollection.valueChanges();
    }

    getPostsByTitle(title: string): Observable<BlogPost[]> {
        this.blogPostCollection = this.afs.collection<BlogPost>('blogPosts', ref => {
            return ref.where('title', '==', `${title}`);
        });
        return this.blogPostCollection.valueChanges();
    }

    getBlogPost(id: string): Observable<BlogPost> {
        this.blogPostDoc = this.afs.doc<BlogPost>(`blogPosts/${id}`);
        this.blogPost$ = this.blogPostDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as BlogPost;
                data.id = action.payload.id;
                return data;
            }
        });
        return this.blogPost$;
    }


    updateBlogPost(formData, id): void {
        const postRef: AngularFirestoreDocument<BlogPost> = this.afs.doc(`blogPosts/${id}`);
        const data: BlogPost = {
            orderNumber: formData.orderNumber,
            title: formData.title,
            body: formData.body,
            photoURL: formData.photoURL,
            buttonString: formData.buttonString,
            url: formData.url,
            id: id,
            updatedAt: Date.now(),
            author: this.loggedInUser,
            isExtURL: formData.isExtURL
        };

        postRef.set(data, { merge: true })
               .then(() => {
                   this.router.navigate(['/blog-posts']);
                   this.sbAlert.open('Blog Post Updated!', 'Dismiss', {
                       duration: 3000,
                       verticalPosition: 'bottom',
                       panelClass: ['snackbar-success']
                   });
               })
               .catch((error) => {
                   this.sbAlert.open(error, 'Dismiss', {
                       duration: 3000,
                       verticalPosition: 'bottom',
                       panelClass: ['snackbar-danger']
                   });
                   console.error(`ERROR~uBP: `, error);
               });
    }

    setBlogPost(formData): Promise<void> {
        const newId = this.afs.createId();
        const calRef: AngularFirestoreDocument<BlogPost> = this.afs.doc(`blogPosts/${newId}`);

        const data: BlogPost = {
            orderNumber: formData.orderNumber,
            title: formData.title,
            body: formData.body,
            photoURL: formData.photoURL,
            buttonString: formData.buttonString,
            url: formData.url,
            id: newId,
            updatedAt: Date.now(),
            author: this.loggedInUser,
            isExtURL: formData.isExtURL
        };

        console.log('data', data);
        return calRef.set(data)
                     .then(() => {
                         this.router.navigate(['/blog-posts']);
                         this.sbAlert.open('Blog Post Created!', 'Dismiss', {
                             duration: 3000,
                             verticalPosition: 'bottom',
                             panelClass: ['snackbar-success']
                         });
                         console.log('Blog Post Created!', data);
                     })
                     .catch((error) => console.log(`ERROR~sBP: `, error));
    }

    deleteBlogPost(id: string): void {
        this.blogPostDoc = this.afs.doc<BlogPost>(`blogPosts/${id}`);
        if (confirm(`Are you sure you want to delete this post? This is irreversible.`)) {
            this.blogPostDoc.delete()
                .then(() => {
                    this.sbAlert.open('Post Deleted', 'Dismiss', {
                        duration: 3000,
                        verticalPosition: 'bottom',
                        panelClass: ['snackbar-success']
                    });
                    this.router.navigate([`/blog-posts`]);
                })
                .catch((error) => {
                    this.sbAlert.open('Something went wrong, Post not Deleted', 'Dismiss', {
                        duration: 3000,
                        verticalPosition: 'bottom',
                        panelClass: ['snackbar-danger']
                    });
                    console.log(`ERROR~dBP: `, error);
                });
        }
    }


}
