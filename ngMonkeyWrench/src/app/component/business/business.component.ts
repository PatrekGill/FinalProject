import { Component, OnInit } from '@angular/core';
import { Business } from 'src/app/models/business';
import { AuthService } from 'src/app/services/auth.service';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private businessService: BusinessService
  ) { }

  ngOnInit(): void {
    if (this.authService.checkLogin()) {
      console.log("creating");

      let business = new Business();
      business.name = "testBusiness";
      business.logoUrl = "test";
      this.businessService.create(business)

    }
  }


}
