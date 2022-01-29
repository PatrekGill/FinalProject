import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isCollapsed : boolean = false;

  user : User = new User();

  constructor(
    private auth: AuthService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  loggedIn(): boolean {
    return this.auth.checkLogin();
  }

  logout():void{
    this.auth.logout();
  }

  openVerticallyCentered(content : any) {
    this.modalService.open(content, { centered: true });
  }

  login(user : User){

  }

}
