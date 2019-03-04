import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { BlogPostEditComponent } from './components/blog-post-edit/blog-post-edit.component';
import { BlogPostListComponent } from './components/blog-post-list/blog-post-list.component';
import { BlogPostNewComponent } from './components/blog-post-new/blog-post-new.component';
import { BlogPostComponent } from './components/blog-post.component';

const cardRoutes: Routes = [
    {
        path: 'blog-posts', component: BlogPostComponent, children: [
            { path: '', component: BlogPostListComponent },
            { path: 'new', component: BlogPostNewComponent },
            { path: ':id/edit', component: BlogPostEditComponent },
        ], canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(cardRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class BlogPostRoutingModule {}
