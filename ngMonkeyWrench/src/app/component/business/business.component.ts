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
  allBusinesses: Business[] = [];
  creatingBusiness: Business;

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private businessService: BusinessService
  ) {
    this.creatingBusiness = new Business();
  }

  ngOnInit(): void {
    this.setUserRole();
    this.setAllBusinesses();
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

  createBusiness(business: Business) {
    this.businessService.create(business);
    this.creatingBusiness = new Business();
    this.setAllBusinesses();
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

  setAllBusinesses() {
    this.businessService.getAll().subscribe(
      {
        next: (businessList) => {
          this.allBusinesses = businessList;
        },
        error: (wrong) => {
          console.error('UserComponent.getBusinesses(): Error retreiving all businesses');
          console.error(wrong);
        },
        complete: () => { }
      }
    );
  }
}
