import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageModule } from '../image/image.module';
import { SharedModule } from '../shared/shared.module';

import { BlogPostRoutingModule } from './blog-post-routing.module';
import { BlogPostEditComponent } from './components/blog-post-edit/blog-post-edit.component';
import { BlogPostItemComponent } from './components/blog-post-item/blog-post-item.component';
import { BlogPostListComponent } from './components/blog-post-list/blog-post-list.component';
import { BlogPostNewComponent } from './components/blog-post-new/blog-post-new.component';
import { BlogPostComponent } from './components/blog-post.component';
import { BlogPostService } from './services/blog-post.service';

@NgModule({
    declarations: [
        BlogPostComponent,
        BlogPostEditComponent,
        BlogPostItemComponent,
        BlogPostListComponent,
        BlogPostNewComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BlogPostRoutingModule,
        ImageModule,
        SharedModule,
    ],
    providers: [
        BlogPostService,
    ]
})
export class BlogPostModule {}
