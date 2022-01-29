import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
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
  ) { }

  ngOnInit(): void {
    // this.loadUsers();
    // this.initUser = this.getUser(1);
    this.initUser = this.getUser(1);
    // console.log(this.users);
    // this.setUser();
  }

  users: User[] = [];
  initUser: User | null | void = null;
  currentUser: User = new User();
  editUser: boolean = false;
  editedUser: User | null = new User();
  editAddress: boolean = false;
  pwUndo: string | undefined = '';


  // loadUsers() {
  //   this.userService.index().subscribe ({
  //     next: (users) => {
  //       this.users = data;
  //     },
  //     error: (wrong) => {
  //       console.error('UserComponent.getUser(): Error retreiving user.');
  //       console.error(wrong);
  //     }
  //   });
  // }

  reload() {
    this.userService.show(this.currentUser.id).subscribe(
      { // OBJECT
        next: (user) => {
          this.currentUser = user;
        },
        error: (wrong) => {
          console.error('TodoListComponent.reload(): Error retreiving todos');
          console.error(wrong);
        },
        complete: () => { }
      } // END OF OBJECT
    );
  }


  getUser(userId: number) {
    this.userService.show(userId).subscribe ({
      next: (user) => {
        this.currentUser = user;
      },
      error: (wrong) => {
        console.error('UserComponent.getUser(): Error retreiving user.');
        console.error(wrong);
      }
    });
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
        console.error('TodoListComponent.updateTodo(): error on update');
        console.error(soSad);
      }
    });
  }


}
