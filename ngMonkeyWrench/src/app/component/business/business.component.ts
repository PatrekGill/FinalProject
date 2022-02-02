import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Address } from 'src/app/models/address';
import { Business } from 'src/app/models/business';
import { Problem } from 'src/app/models/problem';
import { ServiceCall } from 'src/app/models/service-call';
import { ServiceType } from 'src/app/models/service-type';
import { User } from 'src/app/models/user';
import { AddressService } from 'src/app/services/address.service';
import { AuthService } from 'src/app/services/auth.service';
import { BusinessService } from 'src/app/services/business.service';
import { ProblemService } from 'src/app/services/problem.service';
import { ServiceCallService } from 'src/app/services/service-call.service';
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
  serviceTypeFilters: number[] = [];
  showOnlyMyBusinesses: boolean = false;
  mustHaveAllServiceTypeFilters: boolean = false;
  serviceCallBusiness: Business | undefined;
  allUsersAddresses: Address[];
  allProblems: Problem[];
  creatingServiceCall: ServiceCall = new ServiceCall();
  problemSearchText: string;
  completedLoadTasks: number = 0;

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private businessService: BusinessService,
    private userService: UserService,
    private serviceTypeService: ServiceTypeService,
    private serviceCallService: ServiceCallService,
    private addressService: AddressService,
    private problemService: ProblemService,
    private router: Router
  ) {
    this.creatingBusiness = new Business();
    this.allContractors = [];
    this.allBusinesses = [];
    this.allServiceTypes = [];
    this.allUsersAddresses = [];
    this.allProblems = [];

    this.usernameSearchText = "";
    this.serviceTypeSearchText = "";
    this.searchBusinessText = "";
    this.problemSearchText = "";
  }

  ngOnInit(): void {
    this.authService.doWithLoggedInUser(
      (user:User) => {
        this.loggedInUser = user;
        this.setUserRole();
        this.setAllUsersAddresses();
        this.setAllBusinesses();
        this.setAllContractors();
        this.setAllServiceTypes();
        this.setAllProblems();
      }
    )
  }

  addToLoadingTask() {
    if (this.isPageLoading()) {
      this.completedLoadTasks++;
    }
  }
  isPageLoading() {
    let loading = true;
    if (this.completedLoadTasks >= 6) {
      loading = false;
    }
    return loading;
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

  setAllProblems() {
    this.problemService.getProblems().subscribe(
      {
        next: (problems) => {
          this.allProblems = problems;
          this.addToLoadingTask();
        },
        error: (errorFound) => {
          console.log("setAllUsersAddresses(): Error getting all addresses");
          console.error(errorFound);
        }

      }
    )
  }

  setShowOnlyMyBusinesses() {
    if (this.showOnlyMyBusinesses) {
      this.showOnlyMyBusinesses = false;
    } else {
      this.showOnlyMyBusinesses = true;
    }
  }
  setMustHaveAllFilters() {
    if (this.mustHaveAllServiceTypeFilters) {
      this.mustHaveAllServiceTypeFilters = false;
    } else {
      this.mustHaveAllServiceTypeFilters = true;
    }
  }

  resetCreatingBusiness() {
    this.creatingBusiness = new Business();
  }

  createServiceCall(serviceCall: ServiceCall) {
    serviceCall.user = this.loggedInUser;

    this.serviceCallService.createServiceCall(serviceCall).subscribe(
      {
        next: () => {
          this.resetServiceCallBusiness();
          this.resetCreatingServiceCall();
          this.router.navigateByUrl("/userDashboard");
        },
        error: (errorFound) => {
          console.log("setAllUsersAddresses(): Error getting all addresses");
          console.error(errorFound);
        }
      }
    )

  }

  resetCreatingServiceCall() {
    this.creatingServiceCall = new ServiceCall();
  }

  resetEditBusiness() {
    this.editBusiness = undefined;
  }


  setCreatingServiceCallBusiness(business: Business) {
    this.creatingServiceCall.business = this.deepCopy(business);
  }

  resetServiceCallBusiness() {
    this.serviceCallBusiness = undefined;
  }

  createBusiness(business: Business) {
    this.businessService.create(
      business,
      () => {
        this.setAllBusinesses()
      }
    );

    this.resetCreatingBusiness();
  }


  updateBusiness(business: Business) {
    this.businessService.update(
      business,
      () => {
        this.setAllBusinesses()
      }
    );

    this.resetEditBusiness();
  }

  deepCopy(objectToCopy:any): any {
    return JSON.parse(JSON.stringify(objectToCopy));
  }

  setEditBusiness(business: Business) {
    this.editBusiness = this.deepCopy(business);
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

        this.addToLoadingTask();
      }
    );
  }

  setAllUsersAddresses() {
    this.allUsersAddresses = [];
    this.addressService.getAddressByUserId(this.loggedInUser.id).subscribe(
      {
        next: (addressess) => {
          this.allUsersAddresses = addressess;
          this.addToLoadingTask();
        },
        error: (errorFound) => {
          console.log("setAllUsersAddresses(): Error getting all addresses");
          console.error(errorFound);
        }
      }
    )
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
              );
              this.addToLoadingTask();
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
          this.addToLoadingTask();
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
          this.addToLoadingTask();
        },
        error: (wrong) => {
          console.error('UserComponent.getBusinesses(): Error retreiving all businesses');
          console.error(wrong);
        },
        complete: () => { }
      }
    );
  }

  serviceTypeInFilter(serviceType: ServiceType): boolean {
    return this.serviceTypeFilters.includes(serviceType.id);
  }

  businessHasServiceType(business:Business, serviceType: ServiceType): boolean {
    let hasType: boolean = false;

    const businessServiceTypes = business.serviceTypes;
    if (businessServiceTypes) {
      const typeId: number = serviceType.id;
      for (let index = 0; index < businessServiceTypes.length; index++) {
        const type = businessServiceTypes[index];

        hasType = type.id === typeId;
        if (hasType) {
          break;
        }
      }

    }

    return hasType;
  }


  businessHasUser(business:Business, user: User): boolean {
    let hasUser: boolean = false;

    const businessUsers = business.users;
    if (businessUsers) {
      const userId: number = user.id;

      for (let index = 0; index < businessUsers.length; index++) {
        const checkUser = businessUsers[index];

        hasUser = checkUser.id === userId;
        if (hasUser) {
          break;
        }
      }

    }

    return hasUser;
  }

  handleServiceTypeFilter(serviceType: ServiceType) {
    const itemIndex = this.serviceTypeFilters.indexOf(serviceType.id);
    if (itemIndex > -1) {
      this.serviceTypeFilters.splice(itemIndex,1);
      // console.log("removed service with id: " + serviceType.id);

    } else {
      this.serviceTypeFilters.push(serviceType.id);
      // console.log("added service with id: " + serviceType.id);

    }

    this.setAllBusinesses();

  }

  handleServiceTypeOnBusiness(business: Business, serviceType: ServiceType) {
    if (!business.serviceTypes) {
      business.serviceTypes = [];
    }

    let indexOfItem = -1;
    const businessServiceTypes = business.serviceTypes;

    for (let index = 0; index < businessServiceTypes.length; index++) {
      const checkServiceType = businessServiceTypes[index];
      if (checkServiceType.id === serviceType.id) {
        indexOfItem = index;
        break;
      }
    }

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

    let indexOfItem = -1;
    const businessUsers = business.users;

    for (let index = 0; index < businessUsers.length; index++) {
      const checkUser = businessUsers[index];
      if (checkUser.id === user.id) {
        indexOfItem = index;
        break;
      }
    }

    if (indexOfItem > -1) {
      business.users.splice(indexOfItem,1);
    } else {
      business.users.push(user);
    }

  }
}
