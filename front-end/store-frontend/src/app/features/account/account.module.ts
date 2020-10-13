import { NgModule } from '@angular/core';
import { LayoutComponent } from './containers/layout/layout.component';
import { AccountRoutingModule } from './account-routing.module';

const declarations = [
  LayoutComponent
];

@NgModule({
  declarations: [...declarations],
  entryComponents: [],
  imports: [AccountRoutingModule],
  providers: [],
})
export class AccountModule {}
