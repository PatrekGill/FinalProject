import { Component, OnInit } from '@angular/core';
import { Business } from 'src/app/models/business';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {
  userRole: string | undefined;
  constructor(
    private authService: AuthService,
    private businessService: BusinessService
  ) {
    this.setUserRole();
  }

  ngOnInit(): void {
    // if (this.authService.checkLogin()) {
    //   console.log("creating");

    //   let business = new Business();
    //   business.name = "testBusiness";
    //   business.logoUrl = "test";
    //   this.businessService.create(business)

    // }
  }

  setUserRole() {
    this.authService.doWithLoggedInUser(
      (user: User) => {
        if (user) {
          this.userRole = user.role;
        } else {
          this.userRole = undefined;
        }
        console.log(this.userRole);

      }
    );
  }


}
