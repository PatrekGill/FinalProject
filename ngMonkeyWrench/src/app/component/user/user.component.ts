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
    private currentRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadUsers();
    console.log(this.users);

    // this.showUser(this.userId);

    let userIdStr = this.currentRoute.snapshot.paramMap.get('id');
    if (userIdStr) {
      let userId = Number.parseInt(userIdStr);
      if( !isNaN(userId)){
        this.userService.show(userId).subscribe({
          next: (todo) => {
            this.selected = todo;
          },
          error: (fail) => {
            console.error('TodoListComponent.ngOnInit(): invalid todoId ' + userId);
            // this.router.navigateByUrl('todonotfound');
          }
        });
      } else {
        // this.router.navigateByUrl('invalidTodoId');
      }
    }


  }

  users: User[] = [];
  // user: User = new User;
  // userId: number | undefined = this.user.id;
  selected: User | null = null;

  loadUsers() {
    this.userService.index().subscribe (
      data => this.users = data,

      err => console.log('Observer got an error ' + err)
    )
  };

  // showUser(userId: number) {
  //   this.userService.show(userId).subscribe (
  //     data => this.user = data,

  //     err => console.log('Observer got an error ' + err)
  //   )
  // }

}
