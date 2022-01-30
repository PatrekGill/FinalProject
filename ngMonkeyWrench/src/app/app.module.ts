import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './component/home/home.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { ContractorLoginComponent } from './component/contractor-login/contractor-login.component';
import { ContractorSidebarComponent } from './component/contractor-sidebar/contractor-sidebar.component';
import { BusinessComponent } from './component/business/business.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserComponent } from './component/user/user.component';
import { FormsModule } from '@angular/forms';
import { BusinessService } from './services/business.service';
import { ContactComponent } from './component/contact/contact.component';
import { ClientListComponent } from './component/client-list/client-list.component';
import { UserAddressesPipe } from './pipes/user-addresses.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    ContractorLoginComponent,
    ContractorSidebarComponent,
    BusinessComponent,
    UserComponent,
    ContactComponent,
    ClientListComponent,
    UserAddressesPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    AuthService,
  	BusinessService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
