import { Component, OnInit } from '@angular/core';
import { ServiceCall } from 'src/app/models/service-call';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceCallService } from 'src/app/services/service-call.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  filterBy : string = 'all';

  currentUser: User = new User();

  serviceCalls: ServiceCall[] = [];

  expandedBox: boolean = true;

  constructor(
    private authService: AuthService,
    private servService: ServiceCallService

  ) { }

  getUsersServiceCalls() {
    this.authService.doWithLoggedInUser((user : User) => {
      this.servService.getServiceCallsByUserId(user.id).subscribe({
        next: (calls) => {
          this.serviceCalls = calls;

        },
        error: (fail) => {
          console.error("userDashboard.getUsersServiceCalls(): failed to find service calls");
        }
      })
    });
  }

  ngOnInit(): void {
    this.getUsersServiceCalls();
    this.getCurrentUserById();
  }

  reload(){
  }

  getCurrentUserById(){
    this.authService.doWithLoggedInUser((user: User) =>{
      this.currentUser = user;
    })
  }
}
