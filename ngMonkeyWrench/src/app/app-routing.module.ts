import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessComponent } from './component/business/business.component';
import { ContractorLoginComponent } from './component/contractor-login/contractor-login.component';
import { HomeComponent } from './component/home/home.component';
import { UserComponent } from './component/user/user.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'contractor', component: ContractorLoginComponent },
  { path: 'business', component: BusinessComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
