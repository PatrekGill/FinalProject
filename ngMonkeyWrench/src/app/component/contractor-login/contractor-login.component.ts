import { Component, EventEmitter, OnInit, Directive } from '@angular/core';
import { Business } from 'src/app/models/business';
import { ServiceCall } from 'src/app/models/service-call';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { BusinessService } from 'src/app/services/business.service';
import { ServiceCallService } from 'src/app/services/service-call.service';


@Component({
  selector: 'app-contractor-login',
  templateUrl: './contractor-login.component.html',
  styleUrls: ['./contractor-login.component.css']
})
export class ContractorLoginComponent implements OnInit {

  filterBy : string = 'all';

  expandedBox: boolean = true;

  userBusinesses : Business[] = [];

  serviceCalls : ServiceCall[] = [];

  businessId : number = 0;

  showCalls: boolean = false;

  currentUser : User = new User();

  businessSelected : Business = new Business();

  showComplete: boolean = false;

  constructor(private authService : AuthService,
              private callService: ServiceCallService,
              private businessService : BusinessService) { }



  ngOnInit(): void {
    this.getBusinessesByUserId();
  }

  getBusinessesByUserId(){
    this.authService.doWithLoggedInUser((user : User) => {
      this.currentUser = user;
      this.businessService.getBusinessesByUserId(user.id).subscribe({
        next: (businesses) => {
          this.userBusinesses = businesses;
        },
        error: (fail) => {
          console.error("ContractorLoginComponent.getBusinessesByUserId(): failed to get businesses");
        }
      })
    });
  }

  getServiceCallsByBusinessId(business: Business): ServiceCall[]{
    this.businessSelected = business;
    this.showCalls = true;
    this.callService.getServiceCallsByBusinessId(business.id).subscribe({
      next: (calls) => {
        console.log(calls);

        // need to test this sorting function
        this.serviceCalls = calls;
        this.serviceCalls.sort(function(a, b) {
          if(a.dateScheduled && b.dateScheduled) {
            return <any>new Date(a.dateScheduled) - <any>new Date(b.dateScheduled);
          }
          return -2;
        })
      },
      error: (fail) => {
        console.error("ContractorLoginComponent.getServiceCallsByBusinessId(): failed to get service calls")
      }
    });
    return this.serviceCalls;
  }

  completeServiceCall(call: ServiceCall): void {
    call.completed = true;
    this.callService.updateServiceCall(call).subscribe({
      next: (updatedCall) => {
        this.getServiceCallsByBusinessId(this.businessSelected);
      },
      error: (fail) => {
        console.error("contractorLogin.completeServiceCall(): failed to complete service call")
      }
    });
  }



}
