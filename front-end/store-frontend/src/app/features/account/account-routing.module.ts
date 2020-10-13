import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './containers/layout/layout.component';
import { AuthGuard } from '../auth/services/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      
    ]
  },
];

@NgModule({
  imports: [],
  exports: [],
})
export class AccountRoutingModule {}
