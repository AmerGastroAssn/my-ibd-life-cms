import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { BlogPostModule } from './blog-post/blog-post.module';
import { CategoryModule } from './category/category.module';
import { CardModule } from './card/card.module';
import { ContactModule } from './contact/contact.module';
import { ContentSectionModule } from './content-section/content-section.module';
import { CoreModule } from './core/core.module';
import { FileModule } from './file/file.module';
import { HomepageModule } from './homepage/homepage.module';
import { ImageModule } from './image/image.module';
import { PageModule } from './page/page.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

const routes: Routes = [
    { path: '**', redirectTo: '/auth/login', pathMatch: 'full' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes,
            // { enableTracing: true }  // For route debugging.
        ),
    ],
    exports: [
        RouterModule,
        CategoryModule,
        ContentSectionModule,
        CoreModule,
        UserModule,
        ImageModule,
        FileModule,
        AuthModule,
        CardModule,
        PageModule,
        HomepageModule,
        BlogPostModule,
        ContactModule,
        SharedModule,
    ],
    entryComponents: []
})
export class AppRoutingModule {}
