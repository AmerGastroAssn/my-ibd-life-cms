import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../../../image/services/image.service';
import { PageService } from '../../../page/services/page.service';
import { BlogPost } from '../../models/blog-post';
import { BlogPostService } from '../../services/blog-post.service';


@Component({
    selector: 'app-blog-post-new',
    templateUrl: './blog-post-new.component.html',
    styleUrls: ['./blog-post-new.component.css']
})
export class BlogPostNewComponent implements OnInit {
    newBlogPostForm: FormGroup;
    photoURL: string;
    title: string;
    body: string;
    buttonString: string;
    url: string;
    orderNumber: number;
    id: string;
    author: string;
    updatedAt: any;
    isExtURL: boolean;
    // State for dropzone CSS toggling
    isHovering: boolean;
    isInvalid: boolean;
    value: any;

    blogPost: BlogPost = {
        id: '',
        orderNumber: 0,
        title: '',
        body: '',
        photoURL: '',
        buttonString: '',
        url: '',
        updatedAt: '',
        author: '',
        isExtURL: false,
    };

    constructor(
        private pageService: PageService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private blogPostService: BlogPostService,
        private storage: AngularFireStorage,
        private afs: AngularFirestore,
        private sbAlert: MatSnackBar,
        private imageService: ImageService,
    ) {
    }

    // For Form Validations
    get f() {
        return this.newBlogPostForm.controls;
    }


    ngOnInit() {
        this.newBlogPostForm = this.fb.group({
            orderNumber: [this.orderNumber || ''],
            title: [this.title || ''],
            body: [this.body,
                   Validators.compose([
                       Validators.required, Validators.minLength(7)
                   ])
            ],
            photoURL: [this.photoURL, Validators.required],
            buttonString: [this.buttonString || ''],
            url: [this.url || ''],
            isExtURL: [this.isExtURL || false],
        });

        this.orderNumber = this.newBlogPostForm.value.orderNumber;
        this.title = this.newBlogPostForm.value.title;
        this.body = this.newBlogPostForm.value.body;
        this.photoURL = this.newBlogPostForm.value.photoURL;
        this.buttonString = this.newBlogPostForm.value.buttonString;
        this.url = this.newBlogPostForm.value.url;
        this.isExtURL = this.newBlogPostForm.value.isExtURL;

    }

    onCreateBlogPost(formData: BlogPost) {
        if (!this.newBlogPostForm.valid) {
            this.sbAlert.open('Form not valid', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        } else {
            this.blogPostService.setBlogPost(formData)
                .then(() => this.newBlogPostForm.reset())
                .catch((error) => console.log(error));
        }


    }


}
