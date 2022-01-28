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

  selectedBusiness: Business | undefined;
  newBusiness: Business | undefined;

  constructor(
    private businessService: BusinessService,
    private authService: AuthService
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


  create(business:Business) {
    business.user = auth;
    const httpOptions = this.authService.getBasicHttpOptions();
    return this.http.post<Todo>(this.url, todo, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

}
