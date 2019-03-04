import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../shared/guards/admin.guard';
import { AuthGuard } from '../shared/guards/auth.guard';
import { AdsComponent } from './components/ads/ads.component';
import { AnalyticsDashboardComponent } from './components/analytics-dashboard/analytics-dashboard.component';
import { MetaComponent } from './components/meta/meta.component';
import { ModalComponent } from './components/modal/modal.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { SettingsComponent } from './components/settings/settings.component';

const coreRoutes: Routes = [
    { path: 'privacy-policy', component: PrivacyPolicyComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: AnalyticsDashboardComponent, canActivate: [AuthGuard] },
    { path: 'meta', component: MetaComponent, canActivate: [AuthGuard] },
    { path: 'modal', component: ModalComponent, canActivate: [AuthGuard] },
    { path: 'ads', component: AdsComponent, canActivate: [AuthGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [AdminGuard] },
];

@NgModule({
    imports: [
        RouterModule.forChild(coreRoutes),
    ],
    exports: [
        RouterModule
    ]
})
export class CoreRoutingModule {}
