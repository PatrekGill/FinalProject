import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Business } from 'src/app/models/business';
import { ServiceType } from 'src/app/models/service-type';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { BusinessService } from 'src/app/services/business.service';
import { ServiceTypeService } from 'src/app/services/service-type.service';
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
  searchBusinessText: string;
  serviceTypeSearchText: string;
  allServiceTypes: ServiceType[];
  editBusiness: Business | undefined;
  loggedInUser: User = new User();

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private businessService: BusinessService,
    private userService: UserService,
    private serviceTypeService: ServiceTypeService
  ) {
    this.creatingBusiness = new Business();
    this.allContractors = [];
    this.allBusinesses = [];
    this.allServiceTypes = [];

    this.usernameSearchText = "";
    this.serviceTypeSearchText = "";
    this.searchBusinessText = "";
  }

  ngOnInit(): void {
    this.authService.doWithLoggedInUser(
      (user:User) => {
        this.loggedInUser = user;
        this.setUserRole();
        this.setAllBusinesses();
        this.setAllContractors();
        this.setAllServiceTypes();
      }
    )
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

  handleServiceTypeOnBusiness(business: Business, serviceType: ServiceType) {
    if (!business.serviceTypes) {
      business.serviceTypes = [];
    }

    const indexOfItem = business.serviceTypes.indexOf(serviceType);
    if (indexOfItem > -1) {
      business.serviceTypes.splice(indexOfItem,1);

    } else {
      business.serviceTypes.push(serviceType);

    }
  }

  handleUserOnBusiness(business: Business, user: User) {
    if (!business.users) {
      business.users = [];
    }

    const indexOfItem = business.users.indexOf(user);
    if (indexOfItem > -1) {
      business.users.splice(indexOfItem,1);

    } else {
      business.users.push(user);

    }
  }

  resetCreatingBusiness() {
    this.creatingBusiness = new Business();
  }

  resetEditBusiness() {
    this.editBusiness = undefined;
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


  updateBusiness(business: Business) {
    this.businessService.update(
      business,
      () => {
        this.setAllBusinesses()
      }
    );
    this.creatingBusiness = new Business();
  }

  setEditBusiness(business: Business) {
    this.editBusiness = Object.assign({},business);
    console.log(this.editBusiness);

  }

  resetServiceTypeSearchText() {
    this.serviceTypeSearchText = "";
  }
  resetUsernameSearchText() {
    this.usernameSearchText = "";
  }

  openCenteredModal(content : any) {
    this.modalService.open(content, { centered: true });
  }

  userOwnsBusiness(business: Business, user: User): boolean {
    return business.user?.username === user.username;
  }

  setUserRole() {
    this.authService.doWithLoggedInUser(
      (user: User) => {
        this.loggedInUser = user;
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

  setAllServiceTypes() {
    this.serviceTypeService.getAll().subscribe(
      {
        next: (serviceTypesList) => {
          this.allServiceTypes = serviceTypesList;
        },
        error: (wrong) => {
          console.error('BusinessComponent.setAllServiceTypes(): Error retreiving all ServiceTypes');
          console.error(wrong);
        },
        complete: () => { }
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

  businessHasServiceType(business:Business, serviceType: ServiceType): boolean {
    let hasType: boolean = false;

    if (business.serviceTypes) {
      const typeId: number = serviceType.id;
      business.serviceTypes.forEach(
        (type) => {
          hasType = type.id === typeId;
          if (hasType) {
            return;
          }
        }
      );
    }

    return hasType;
  }
}
