import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Address } from 'src/app/models/address';
import { Business } from 'src/app/models/business';
import { User } from 'src/app/models/user';
import { AddressService } from 'src/app/services/address.service';
import { AuthService } from 'src/app/services/auth.service';
import { BusinessService } from 'src/app/services/business.service';
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
    private businessService: BusinessService
  ) { }

  ngOnInit(): void {

    this.getUser();
    // this.getBusinesses();

  }

  currentUserId: number = 0;

  users: User[] = [];
  currentUser: User = new User();
  editedUser: User | null = new User();
  editUser: boolean = false;

  addresses: Address[] = [];
  currentAddress: Address = new Address();
  editedAddress: Address | null = new Address();
  editAddress: boolean = false;

  businesses: Business[] = [];

  pwUndo: string | undefined = '';

  chosenUserId: number = 0;


  reload() {
    this.userService.show(this.currentUser.id).subscribe(
      { // OBJECT
        next: (user) => {
          this.editUser = false;
          this.currentUser = user;
          this.getAddresses();
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
          this.getBusinesses();
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
        },
        error: (wrong) => {
          console.error('UserComponent.getAddressses(): Error retreiving addresses by UserId');
          console.error(wrong);
        },
        complete: () => { }
      } // END OF OBJECT
    );
  }

  // setEditAddress() {
  //   this.editedAddress = Object.assign({}, this.currentAddress);
  //   this.editedAddress.user.id = 3;
  // }

  udpateAddress(address: Address, goToDetails = true) {
    if(this.currentUser.id == address.user?.id || this.currentUser.id == 1) {
      console.log('userID for address pre set');
      console.log(address.user.id);

      address.user.id = 3;

      console.log('userID for address post set');
      console.log(address.user.id);


      this.addyService.updateAddress(address).subscribe({
        next: (t) => {
          // this.editedAddress = null;
          if(goToDetails) {
            // this.currentAddress = t;
          }
          this.reload();
        },
        error: (soSad) => {
          console.error('UserComponent.updateUser(): error on update');
          console.error(soSad);
        }
      });
    }
  }

  getBusinesses() {
    this.businessService.getAll().subscribe(
      { // OBJECT
        next: (business) => {
          this.businesses = business;
          console.log('BUSINESSES');
          console.log(this.businesses);
        },
        error: (wrong) => {
          console.error('TodoListComponent.reload(): Error retreiving todos');
          console.error(wrong);
        },
        complete: () => { }
      } // END OF OBJECT
    );
  }

}
