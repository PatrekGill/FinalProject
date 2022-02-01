import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  loggedInUser : User = new User();

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.doWithLoggedInUser((user: User) => {
      this.loggedInUser = user;
    });

  }


}
