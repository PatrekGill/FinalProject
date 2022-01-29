import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  currentUser: User = new User();

  constructor(
    private authService: AuthService
  ) { }

  getUser() {
    const username = this.authService.getLoggedInUsername();
    if(username !== null) {
    this.authService.showUsername(username).subscribe ({
        next: (user) => {
          this.currentUser = user;
        },
        error: (wrong) => {
          console.error('UserComponent.getUser(): Error retreiving user.');
          console.error(wrong);
        }
      });
    }
  }

  ngOnInit(): void {
    this.getUser();
  }

}
