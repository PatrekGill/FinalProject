import { Component, EventEmitter, OnInit, Directive } from '@angular/core';
import { Business } from 'src/app/models/business';
import { Problem } from 'src/app/models/problem';
import { ServiceCall } from 'src/app/models/service-call';
import { Solution } from 'src/app/models/solution';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { BusinessService } from 'src/app/services/business.service';
import { ProblemService } from 'src/app/services/problem.service';
import { ServiceCallService } from 'src/app/services/service-call.service';
import { SolutionService } from 'src/app/services/solution.service';


@Component({
  selector: 'app-contractor-login',
  templateUrl: './contractor-login.component.html',
  styleUrls: ['./contractor-login.component.css']
})
export class ContractorLoginComponent implements OnInit {

  constructor(
    private authService : AuthService,
    private callService: ServiceCallService,
    private businessService : BusinessService,
    private problemService: ProblemService,
    private solutionService: SolutionService
    )
    { }

  filterBy : string = 'all';

  expandedBox: boolean = true;

  businessId : number = 0;
  userBusinesses : Business[] = [];
  businessSelected : Business = new Business();

  serviceCalls : ServiceCall[] = [];
  currentServiceCall : ServiceCall= new ServiceCall();
  showCalls: boolean = false;
  showComplete: boolean = false;
  showCurrentCall: boolean = false;

  currentUser : User = new User();

  allProblems: Problem[] = [];
  currentProblem: Problem = new Problem();

  allSolutions: Solution[] = [];
  currentSolution: Solution = new Solution;



  ngOnInit(): void {
    this.getBusinessesByUserId();
    this.getAllProblems();
    this.getAllSolutions();
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
        // console.log(calls);

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

  getServiceCallById(call: ServiceCall) {

    this.showCalls = false;
    this.showCurrentCall = true;
    this.callService.getServiceCallById(call.id).subscribe({
      next: (call) => {
        this.currentServiceCall = call;
      },
      error: (fail) => {
        console.error("ContractorLoginComponent.getServiceCallsByBusinessId(): failed to get service calls");
        console.error(fail);
      }
    });
    // return this.currentServiceCall;
  }

  updateServiceCall(call: ServiceCall) {
    console.log(call);

    this.callService.updateServiceCall(call).subscribe({
      next: (t) => {
        // this.reload();
        this.showCurrentCall = false;
        this.showCalls = true
        if(this.businessSelected){
          this.getServiceCallsByBusinessId(this.businessSelected)
        }

      },
      error: (soSad) => {
        console.error('UserComponent.updateUser(): error on update');
        console.error(soSad);
      }
    });
  }


  getAllProblems() {
    this.problemService.getProblems().subscribe(
      { // OBJECT
        next: (problemsList) => {
          this.allProblems = problemsList;
        },
        error: (wrong) => {
          console.error('ContractorLoginComponent.getAllProblems(): Error retreiving all problems');
          console.error(wrong);
        },
        complete: () => { }
      } // END OF OBJECT
    );
  }

  getAllSolutions() {
    this.solutionService.getSolutions().subscribe(
      { // OBJECT
        next: (solutionsList) => {
          this.allSolutions = solutionsList;
        },
        error: (wrong) => {
          console.error('ContractorLoginComponent.getAllSolutions(): Error retreiving all solutions');
          console.error(wrong);
        },
        complete: () => { }
      } // END OF OBJECT
    );
  }

}
