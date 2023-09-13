import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';



export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required]);
  password = new FormControl('', Validators.required);
  loggedInUserName: string | null = null;
  loggedInUserEmail: string | null = null;
  loggedInUserPassword: string | null = null;
  storedUsers: User[] = [];
  userForm!: FormGroup;
  userArray: User[] = [];
  isForUpdate: boolean = false;
  selectedUser: User | undefined;
  dataSource: MatTableDataSource<User>;
  isAddingUser: boolean = false;
  hide = true;

  constructor(private router: Router, private formBuilder : FormBuilder) { 
    this.dataSource = new MatTableDataSource<User>(this.storedUsers);
    
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    const storedUserArray = localStorage.getItem('userArray');
    if (storedUserArray) {
      this.storedUsers = JSON.parse(storedUserArray);
      this.dataSource.data = this.storedUsers;
    }
 
      
      const loggedInUserData = localStorage.getItem('loggedInUser');
    if (loggedInUserData) {
      const loggedInUser = JSON.parse(loggedInUserData);
      this.loggedInUserName = loggedInUser.name;
      this.loggedInUserEmail = loggedInUser.email;
      this.loggedInUserPassword = loggedInUser.password
      }
  

  }
  logout() {
    localStorage.removeItem('isLoggedIn'); 
    this.router.navigate(['/login']);
  }

  addNewUser(){
    this.userForm.reset();
    this.isForUpdate = false;
    this.selectedUser = undefined;
    this.showAddForm = true;
    this.isAddingUser = true;

  }
  addUser() {
    const newUser: User = {
      id: this.storedUsers.length + 1, 
      ...this.userForm.value 
    };
    this.storedUsers.push(newUser);
    this.userForm.reset();
    this.isForUpdate = false;
    this.selectedUser = undefined;
    this.showAddForm = false;
    this.isAddingUser = false;
    this.dataSource.data = this.storedUsers;
  }
  
  cancelAddUser() {
    this.userForm.reset();
    this.isAddingUser = false;
  }

  editUser(user: User) {
    this.selectedUser = user;
    this.userForm.patchValue(user);
    this.isForUpdate = true;
    this.showEditForm = true;

  }

  deleteUser(user: User) {
    const index = this.storedUsers.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      this.storedUsers.splice(index, 1);
      this.dataSource.data = this.storedUsers;
    }
  }

  updateExistingUser() {
    if (this.selectedUser) {
      const index = this.storedUsers.findIndex(u => u.id === this.selectedUser?.id);
      if (index !== -1) {
        const updatedUser: User = {
          id: this.selectedUser.id,
          ...this.userForm.value
        };
  
        this.storedUsers[index] = updatedUser;
        this.userForm.reset();
        this.isForUpdate = false;
        this.selectedUser = undefined;
        this.showEditForm = false;
        this.dataSource.data = this.storedUsers;

      }
    }
  }

  getErrorMessageMail() {
    if (this.email.hasError('required')) {
      return 'You must enter a valid mail Id';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessageName(){
    if (this.name.hasError('required')){
      return 'You must enter a valid name'
    }

    return this.name.hasError('name') ? 'Not a valid name' : '';
  }

  getErrorMessagePassword(){
    if(this.password.hasError('required')){
      return 'You must enter a valid password';

    }
    return this.password.hasError('password') ? 'not a valid password' : '';
  }

  showEditForm: boolean = false;
  showPassword: boolean = false;
  showAddForm: boolean = false;

}
