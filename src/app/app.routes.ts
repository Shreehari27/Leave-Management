import { Routes } from '@angular/router';
import { LeaveList } from './components/leave-list/leave-list';
import { LeaveApply } from './components/leave-apply/leave-apply';
import { LeaveDetail } from './components/leave-detail/leave-detail';

export const routes: Routes = [
    { path: '', redirectTo: 'leaves', pathMatch: 'full' },
    { path: 'leaves', component: LeaveList },
    { path: 'apply', component: LeaveApply },
    { path: 'leaves/:id', component: LeaveDetail },
    { path: '**', redirectTo: 'leaves' }

];
