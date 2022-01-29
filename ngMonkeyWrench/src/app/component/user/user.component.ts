import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AddressService } from 'src/app/services/address.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private addyService: AddressService
  ) { }



  users: User[] = [];
  initUser: Observable<User> | undefined = new Observable<User>();
  currentUser: User = new User();
  editUser: boolean = false;
  editedUser: User | null = new User();
  editAddress: boolean = false;
  pwUndo: string | undefined = '';



  reload() {
    this.userService.show(this.currentUser.id).subscribe(
      { // OBJECT
        next: (user) => {
          this.editUser = false;
          this.currentUser = user;

        },
        error: (wrong) => {
          console.error('TodoListComponent.reload(): Error retreiving todos');
          console.error(wrong);
        },
        complete: () => { }
      } // END OF OBJECT
    );
  }


  getUser() {
    console.log('in GETUSER');
    const username = this.authService.getLoggedInUsername();
    console.log('username');
    console.log(username);

    if(username !== null) {
    this.authService.showUsername(username).subscribe ({
        next: (user) => {
          this.currentUser = user;
          console.log('in getUser');

    console.log(this.currentUser);

        },
        error: (wrong) => {
          console.error('UserComponent.getUser(): Error retreiving user.');
          console.error(wrong);
        }
      });
    }
    // return user;
  }

  setEditUser() {
    this.editedUser = Object.assign({}, this.currentUser);;
  }

  updateUser(user: User, goToDetails = true) {
    this.userService.update(user).subscribe({
      next: (t) => {
        this.editedUser = null;
        if(goToDetails) {
          this.currentUser = t;
        }
        this.reload();
      },
      error: (soSad) => {
        console.error('UserComponent.updateUser(): error on update');
        console.error(soSad);
      }
    });
  }

  ngOnInit(): void {

    this.getUser();
    console.log(this.currentUser);


  }

}
