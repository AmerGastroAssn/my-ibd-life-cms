import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../../../image/services/image.service';
import { PageService } from '../../../page/services/page.service';
import { BlogPost } from '../../models/blog-post';
import { BlogPostService } from '../../services/blog-post.service';


@Component({
    selector: 'app-post-edit',
    templateUrl: './blog-post-edit.component.html',
    styleUrls: ['./blog-post-edit.component.css'],
    animations: [
        // the fade-in/fade-out animation.
        trigger('simpleFadeAnimation', [

            // the "in" style determines the "resting" state of the element when it is visible.
            state('in', style({ opacity: 1 })),

            // fade in when created. this could also be written as transition('void => *')
            transition(':enter', [
                style({ opacity: 0 }),
                animate(500)
            ]),

            // fade out when destroyed. this could also be written as transition('void => *')
            transition(':leave',
                animate(300, style({ opacity: 0 })))
        ])
    ]
})
export class BlogPostEditComponent implements OnInit {
    editPostForm: FormGroup;
    post: BlogPost;
    photoURL: string;
    title: string;
    body: string;
    buttonString: string;
    url: string;
    orderNumber: number;
    id: string;
    isExtURL: boolean;
    // State for dropzone CSS toggling
    isHovering: boolean;
    isInvalid: boolean;
    value: any;


    constructor(
        private pageService: PageService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private postService: BlogPostService,
        private storage: AngularFireStorage,
        private afs: AngularFirestore,
        private sbAlert: MatSnackBar,
        private imageService: ImageService,
    ) {
        // Get id from url
        this.id = this.route.snapshot.params['id'];
    }

    // For Form Validations
    get f() {
        return this.editPostForm.controls;
    }

    ngOnInit() {
        // Post1 Form:
        this.postService.getBlogPost(this.id).subscribe((post: BlogPost) => {
            this.post = post;

            this.editPostForm = this.fb.group({
                orderNumber: [this.post.orderNumber || ''],
                title: [this.post.title || ''],
                body: [this.post.body,
                       Validators.compose([
                           Validators.required, Validators.minLength(7)
                       ])
                ],
                photoURL: [this.post.photoURL, Validators.required],
                buttonString: [this.post.buttonString, Validators.required],
                url: [this.post.url, Validators.required],
                isExtURL: [this.post.isExtURL || false],
            });

            this.orderNumber = this.editPostForm.value.orderNumber;
            this.title = this.editPostForm.value.title;
            this.body = this.editPostForm.value.body;
            this.photoURL = this.editPostForm.value.photoURL;
            this.buttonString = this.editPostForm.value.buttonString;
            this.url = this.editPostForm.value.url;
            this.isExtURL = this.editPostForm.value.isExtURL;
        });

    }

    onUpdateBlogPost(formData: BlogPost) {
        if (this.editPostForm.valid) {
            this.postService.updateBlogPost(formData, this.id);
            this.editPostForm.reset();
        } else {
            this.sbAlert.open('Form Data is invalid', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        }
    }

    onDeleteBlogPost(id) {
        this.postService.deleteBlogPost(id);
    }
}
