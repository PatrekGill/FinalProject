import { Component, OnInit } from '@angular/core';
import { ServiceCall } from 'src/app/models/service-call';

@Component({
  selector: 'app-contractor-login',
  templateUrl: './contractor-login.component.html',
  styleUrls: ['./contractor-login.component.css']
})
export class ContractorLoginComponent implements OnInit {

  expandedBox: boolean = false;

  // testServiceCall: ServiceCall[] = [{
  //   problemDescription: "No fridge or furnace",
  //   dateCreated: "2022-01-15T10:00:00",
  //   dateScheduled: "2022-01-16T11:00:00",
  //   hoursLabor: 0,
  //   totalCost: 1.99,
  //   contractorNotes: null,
  //   address: {
  //       id: 2
  //   },
  //   problem: {
  //       id: 2
  //   },
  //   busines: {
  //       id: 1
  //   },
  //   user: {
  //       id: 1
  //   },
  //   completed: false,
  //   estimate: true,
  //   customerRating: null,
  //   customerRatingComment: null
  // }]
  // contractorServiceCallsInProgress: ServiceCall[];

  constructor() { }

  ngOnInit(): void {
  }

}
