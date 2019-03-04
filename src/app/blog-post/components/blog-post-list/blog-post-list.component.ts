import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../../models/blog-post';
import { BlogPostService } from '../../services/blog-post.service';

@Component({
    selector: 'app-post-list',
    templateUrl: './blog-post-list.component.html',
    styleUrls: ['./blog-post-list.component.css'],
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
export class BlogPostListComponent implements OnInit {
    blogPosts$: Observable<BlogPost[]>;
    favicon = 'fa fa-window-restore';
    sectionName = 'Blog Posts';

    constructor(
        private postService: BlogPostService
    ) {
    }


    ngOnInit() {
        this.blogPosts$ = this.postService.getAllPosts();
    }

    onDeleteBlogPost(id: string) {
        this.postService.deleteBlogPost(id);
    }

}
