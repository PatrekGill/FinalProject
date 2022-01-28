import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {

  constructor(
    private businessService: BusinessService
  ) { }

  ngOnInit(): void {
  }

}
