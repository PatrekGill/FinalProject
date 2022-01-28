import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private userService: UserService,
    private currentRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.loadUsers();
    // this.initUser = this.getUser(1);
    this.initUser = this.getUser(1);
    // console.log(this.users);
    // this.setUser();
  }

  users: User[] = [];
  initUser: User | null | void = null;
  currentUser: User = new User();
  editUser: boolean = false;
  editAddress: boolean = false;




  // loadUsers() {
  //   this.userService.index().subscribe ({
  //     next: (users) => {
  //       this.users = data;
  //     },
  //     error: (wrong) => {
  //       console.error('UserComponent.getUser(): Error retreiving user.');
  //       console.error(wrong);
  //     }
  //   });
  // }

  getUser(userId: number) {
    this.userService.show(userId).subscribe ({
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
