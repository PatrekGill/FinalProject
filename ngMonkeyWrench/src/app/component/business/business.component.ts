import { Component, OnInit } from '@angular/core';
import { Business } from 'src/app/models/business';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {

  selectedBusiness: Business | undefined;

  constructor(
    private businessService: BusinessService
  ) { }

  ngOnInit(): void {
  }


  setSelected(id:number | string) {
    this.businessService.show(id).subscribe(
      {
        next: foundBusiness => {
          this.selectedBusiness = foundBusiness;
          console.log(foundBusiness);

        },
        error: fail => {
          console.log("getById(): failed to find business");
        }
      }
    )
  }
}
