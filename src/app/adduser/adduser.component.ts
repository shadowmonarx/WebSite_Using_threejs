import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.less']
})



export class AdduserComponent implements OnInit {
  userForm!: FormGroup;
  userArray: User[] = [];
  isForUpdate: boolean = false;
  selectedUser: User | undefined;

  constructor(private formBuilder: FormBuilder, private router: Router, private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const source = params['source'];
      
      if (source === 'welcome') {
        this.router.navigate(['/welcome']);
      } else if (source === 'login') {
        this.router.navigate(['/login']);
      }
    });
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required ,Validators.email]],
      password: ['', [Validators.required]]
    });

    this.userArray = [
      {
        id: 1,
        name: 'Vishal',
        email:'vishalsharma',
        password:'123',
      },
      {
        id: 2,
        name: 'Rohit',
        email:'rohittata',
        password:'123',
      },
      {
        id: 3,
        name: 'John',
        email:'johnpapa',
        password:'890',
      }
    ];
  }

  addUser() {
    const newUser: User = {
      id: this.userArray.length + 1, 
      ...this.userForm.value 
    };
    this.userArray.push(newUser);
    this.userForm.reset()

    localStorage.setItem('userArray', JSON.stringify(this.userArray));
    this.router.navigate(['/login']);

  
  }

  deleteUser(user: User) {
    const index = this.userArray.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.userArray.splice(index, 1);
    } 
  }

  editUser(user: User) {
    this.selectedUser = user;
    this.userForm.patchValue(user);
    this.isForUpdate = true;
  }

  updateExistingUser() {
    if (this.selectedUser) {
      const index = this.userArray.findIndex(u => u.id === this.selectedUser?.id);
      if (index !== -1) {
        const updatedUser: User = {
          id: this.selectedUser.id,
          ...this.userForm.value
        };
  
        this.userArray[index] = updatedUser;
        this.userForm.reset();
        this.isForUpdate = false;
        this.selectedUser = undefined;
        localStorage.setItem('userArray', JSON.stringify(this.userArray));
      }
    }
  }

  isComingFromWelcomePage: boolean = true; 

navigateFromRegisterButton() {
  this.isComingFromWelcomePage = false;
}

  


  }











