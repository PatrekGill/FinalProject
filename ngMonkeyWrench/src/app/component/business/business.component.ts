import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Business } from 'src/app/models/business';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { BusinessService } from 'src/app/services/business.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {
  userRole: string | undefined;
  allBusinesses: Business[];
  creatingBusiness: Business;
  allContractors: User[];
  usernameSearchText: string;

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private businessService: BusinessService,
    private userService: UserService
  ) {
    this.creatingBusiness = new Business();

    this.allContractors = [];
    this.allBusinesses = [];
    this.usernameSearchText = "";
  }

  ngOnInit(): void {
    this.setUserRole();
    this.setAllBusinesses();
    this.setAllContractors();
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

  handleUserOnBusiness(business: Business, user: User) {
    if (!business.users) {
      business.users = [];
    }

    const indexOfItem = business.users.indexOf(user);
    if (indexOfItem > -1) {
      business.users.splice(indexOfItem,1);
      console.log("remove");

    } else {
      business.users.push(user);
      console.log("add");

    }

  }

  resetCreatingBusiness() {
    this.creatingBusiness = new Business();
  }

  createBusiness(business: Business) {
    this.businessService.create(
      business,
      () => {
        this.setAllBusinesses()
      }
    );
    this.creatingBusiness = new Business();
  }


  resetUsernameSearchText() {
    this.usernameSearchText = "";
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
      }
    );
  }

  setAllContractors() {
    this.allContractors = [];
    this.userService.getAll().subscribe(
      {
        next: (allUsers) => {
          // filtering logged in user
          this.authService.doWithLoggedInUser(
            (loggedInUser:User) => {
              allUsers.forEach(
                (user) => {
                  if (user.username !== loggedInUser.username && (user.enabled && user.role === "business")) {
                    this.allContractors.push(user);
                  }
                }
              )
            }
          )
        },
        error: (errorFound) => {
          console.log("setAllContractors(): Error getting all users");
          console.error(errorFound);

        }
      }
    )
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
