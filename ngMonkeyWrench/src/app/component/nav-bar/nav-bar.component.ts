import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isCollapsed : boolean = false;

  loginUser : User = new User();

  createUser : User = new User();

  constructor(
    private auth: AuthService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  loggedIn(): boolean {
    return this.auth.checkLogin();
  }

  logout():void{
    this.auth.logout();
  }

  openVerticallyCenteredLogin(content : any) {
    this.modalService.open(content, { centered: true });
  }

  openVerticallyCenteredRegister(register : any) {
    this.modalService.open(register, { centered: true });
  }

  resetLoginUser() {
    this.loginUser = new User();
  }

  login(user : User){
    this.resetLoginUser();
    if (user.username && user.password) {
      this.auth.login(user.username,user.password).subscribe({
        next: () => {
          if(user.role === 'Busniess'){
            this.router.navigateByUrl('/contractor');
          }
          else{
            this.router.navigateByUrl('/user');
          }
        },
        error: () => {
          console.error("Error loggin in");
        }
      });
    }
  }

  resetCreateUser(){
    this.createUser = new User();
  }

  createAccount(createUser : User){
    this.resetCreateUser();
    this.auth.register(createUser).subscribe(
      {
        next: () => {
          if(createUser.username && createUser.password){
            this.auth.login(createUser.username, createUser.password).subscribe({
              next: () => {
                if(createUser.role === 'Busniess'){
                  this.router.navigateByUrl('/contractor');
                }
                else{
                  this.router.navigateByUrl('/user');
                }
              },
              error: () => {
                console.error("Error loggin in");
                }
              });
            }
          },
          error: (fail) => {
            console.error("registerComponent.register(): Error creating account");
            console.error(fail);
            }
          }
        );
      }
}
