import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { CategoryComponent } from './components/category.component';

const calendarRoutes: Routes = [
    {
        path: 'categories', component: CategoryComponent,
        children: [
            { path: '', component: CategoryListComponent },
            { path: 'new', component: CategoryNewComponent },
            { path: ':id/edit', component: CategoryEditComponent },
        ], canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(calendarRoutes),
    ],
    exports: [
        RouterModule
    ]
})
export class CategoryRoutingModule {}
