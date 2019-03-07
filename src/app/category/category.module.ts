import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { CategoryItemComponent } from './components/category-item/category-item.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { CategoryComponent } from './components/category.component';
import { CategoryService } from './services/category.service';


@NgModule({
    declarations: [
        CategoryComponent,
        CategoryEditComponent,
        CategoryItemComponent,
        CategoryListComponent,
        CategoryNewComponent,
    ],
    imports: [
        CommonModule,
        CategoryRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        CoreModule,
    ],
    providers: [
        CategoryService,
    ],
    exports: []
})
export class CategoryModule {}
