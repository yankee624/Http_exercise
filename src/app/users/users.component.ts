import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
      this.userService.getUsers().subscribe(users => this.users=users);
  }


  add(name: string, major: string): void {
    name = name.trim();
    major = major.trim();
    if (!name || !major) { return; }
    this.userService.addUser({name:name, major:major})
      .subscribe(user => {
        this.users.push(user);
      });
  }

  delete(user: User): void{
    this.users = this.users.filter(s => s !== user);
    this.userService.deleteUser(user).subscribe();
  }

}
