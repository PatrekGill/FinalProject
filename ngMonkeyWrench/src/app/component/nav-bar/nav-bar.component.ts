import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isCollapsed : boolean = false;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  loggedIn(): boolean {
    return this.auth.checkLogin();
  }

  logout():void{
    this.auth.logout();
  }

}
