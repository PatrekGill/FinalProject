import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
    private modalService: NgbModal,
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

    this.getAllBusinesses();
  }

  isRoleBusiness(): boolean {
    return this.userRole === "business";
  }
  isRoleCustomer(): boolean {
    return this.userRole === "customer";
  }
  isRoleUndefined(): boolean {
    return this.userRole === undefined;
  }


  openCenteredModal(content : any) {
    this.modalService.open(content, { centered: true });
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

  getAllBusinesses() {
    this.businessService.getAll().subscribe(
      { // OBJECT
        next: (businessList) => {
          this.businesses = businessList;

          console.log('in User getBusinesses');
          console.log(this.businesses);

        },
        error: (wrong) => {
          console.error('UserComponent.getBusinesses(): Error retreiving all businesses');
          console.error(wrong);
        },
        complete: () => { }
      } // END OF OBJECT
    );
  }

  businesses: Business[] = [];

}
