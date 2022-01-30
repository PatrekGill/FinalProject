import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Address } from 'src/app/models/address';
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
    private currentRoute: ActivatedRoute,
    private authService: AuthService,
    private addyService: AddressService,
  ) { }

  ngOnInit(): void {

    this.getUser();
    // this.getAddresses();

  }

  users: User[] = [];
  currentUser: User = new User();
  addresses: Address[] = [];

  editUser: boolean = false;
  editedUser: User | null = new User();
  editAddress: boolean = false;
  pwUndo: string | undefined = '';

  chosenUserId: number = 0;
  // currentUserId: number = this.currentUser.id;
  currentUserId: number = 0;



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
    const username = this.authService.getLoggedInUsername();
    if(username !== null) {
    this.authService.showUsername(username).subscribe ({
        next: (user) => {
          this.currentUser = user;
          this.getAddresses();
        },
        error: (wrong) => {
          console.error('UserComponent.getUser(): Error retreiving user.');
          console.error(wrong);
        }
      });
    }
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


  getAddresses() {
    this.currentUserId = this.currentUser.id;
    this.addyService.getAddressByUserId(this.currentUserId).subscribe(
      { // OBJECT
        next: (addressList) => {
          this.addresses = addressList;

          console.log('in User getAddresses');
          console.log(this.addresses);

        },
        error: (wrong) => {
          console.error('UserComponent.getAddressses(): Error retreiving addresses by UserId');
          console.error(wrong);
        },
        complete: () => { }
      } // END OF OBJECT
    );

  }


}
