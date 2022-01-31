import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models/address';
import { Problem } from 'src/app/models/problem';
import { ServiceCall } from 'src/app/models/service-call';
import { User } from 'src/app/models/user';
import { AddressService } from 'src/app/services/address.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProblemService } from 'src/app/services/problem.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clientAddresses : Address[] = [];

  serviceCallProblems: Problem[] = [];

  viewAddressForm : boolean = false;

  viewServiceCallForm : boolean = false;

  viewCustomer : User | null = null;

  newAddress : Address = new Address;

  newServiceCall : ServiceCall = new ServiceCall;

  clientList : User[] = [];

  firstNameSearch : string = "";

  lastNameSearch : string = "";

  phoneNumberSearch : string = "";

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private addressService: AddressService,
    private problemService: ProblemService
  ) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers(){
    this.userService.index().subscribe({
      next: (customers) => {
        this.clientList = customers;
      },
      error: (fail) => {
        console.error("ClientListComponent.getAllCustomers(): failed to get customers")
      }
    });
  }

  getAddressesByUserId(client: User){
    this.viewCustomer = client;
    this.addressService.getAddressByUserId(client.id).subscribe({
      next: (addresses) => {
        this.clientAddresses = addresses;
      },
      error: (fail) => {
        console.error("ClientListComponent.getAddressesByUserId(): failed to get addresses")
      }
    })
  }

  addServiceCallToAddress(address: Address){

  }

  createNewAddress(address: Address){
    this.viewAddressForm = false;
    if(this.viewCustomer !== null){
      address.user = this.viewCustomer;
    }
    console.log(address);

    this.addressService.createAddress(address).subscribe({
      next: (address) => {
        this.clientAddresses.push(address);
        if(this.viewCustomer !== null){
          this.getAddressesByUserId(this.viewCustomer);
        }

      },
      error: (fail) => {
        console.error('ClientListComponent.createNewAddress(): failed to create new address')
      }
    });
  }

  getAllProblems(){
    this.problemService.getProblems().subscribe({
      next: (problems) => {

      }
    })
  }


}
