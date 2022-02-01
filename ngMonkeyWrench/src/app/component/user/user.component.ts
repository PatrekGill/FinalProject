import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Address } from 'src/app/models/address';
import { Business } from 'src/app/models/business';
import { User } from 'src/app/models/user';
import { DuplicateAddressCheckPipe } from 'src/app/pipes/duplicate-address-check.pipe';
import { UserAddressesPipe } from 'src/app/pipes/user-addresses.pipe';
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
    private businessService: BusinessService,
    private addressCheck: DuplicateAddressCheckPipe
  ) { }

  ngOnInit(): void {

    this.getUser();
    this.getAllAddresses();
    this.getBusinesses();

  }

  currentUserId: number = 0;

  users: User[] = [];
  currentUser: User = new User();
  editedUser: User | null = new User();
  editUser: boolean = false;

  allAddresses: Address[] = [];
  userAddresses: Address[] = [];
  newAddress: Address = new Address();
  editedAddress: Address | null = new Address();
  addingAddress: boolean = false;
  addressError: boolean = false;
  addressErrorTxt: string = '';
  stateAbbr: string = '';

  businesses: Business[] = [];

  pwUndo: string | undefined = '';

  reload() {
    this.userService.show(this.currentUser.id).subscribe(
      { // OBJECT
        next: (user) => {
          this.editUser = false;
          this.currentUser = user;
          this.getAddresses();
          this.getAllAddresses();
          this.addressError = false;
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
          this.userAddresses = addressList;
        },
        error: (wrong) => {
          console.error('UserComponent.getAddressses(): Error retreiving addresses by UserId');
          console.error(wrong);
        },
        complete: () => { }
      } // END OF OBJECT
    );
  }

  getAllAddresses() {
    this.addyService.getAddresses().subscribe(
      { // OBJECT
        next: (addressList) => {
          this.allAddresses = addressList;
        },
        error: (wrong) => {
          console.error('UserComponent.getAddressses(): Error retreiving addresses by UserId');
          console.error(wrong);
        },
        complete: () => { }
      } // END OF OBJECT
    );
  }

  updateAddress(address: Address) {
    if(this.currentUser.id == address.user.id || this.currentUser.id == 1) {

      address.user.id = 3;

      this.addyService.updateAddress(address).subscribe({
        next: (t) => {
          this.reload();
        },
        error: (soSad) => {
          console.error('UserComponent.updateUser(): error on update');
          console.error(soSad);
        }
      });
    }
  }

  setStateAbbr(abbr: string) {
    this.newAddress.stateAbbv = abbr;
  }

  stateAbbreviations = [
    'AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA',
    'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA',
    'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY',
    'NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX',
    'UT','VT','VA','WA','WV','WI','WY'
   ];

  addAddress(address: Address) {
    address.user.id = this.currentUserId;

    if(address.street === ''
    || address.city === ''
    || address.stateAbbv === ''
    ) {
      this.addressError = true;
      this.addressErrorTxt = 'Please include the street address, city, and state';
    }
    else if(this.addressCheck.transform(this.allAddresses, address)){
      console.log('UNIQUE ADDRESS');
      this.addyService.createAddress(address).subscribe({
        next: (addy) => {
          this.reload();
        },
        error: (fail) => {
          console.error('UserComponent.addAddress(): Error creating address');
          console.error(fail);
        }
      });
    } else {
      console.log('ERROR ERROR');
      this.addressError = true;
      this.addressErrorTxt = 'Cannot add address. Address already on file. If this is an error please click the link to email the admin.'
    }
  }

  getBusinesses() {
    this.businessService.getAll().subscribe(
      { // OBJECT
        next: (business) => {
          this.businesses = business;
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
