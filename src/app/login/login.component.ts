import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})



export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required])
  hide = true;
  loading : boolean=false;
  userForm!: FormGroup;
  storedUsers: { name: string ,email: string, password: string }[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router, private matInput: MatInputModule , private matForm: MatFormFieldModule){}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required,Validators.email],
      password: ['', Validators.required]
    });

    const storedUserArray = localStorage.getItem('userArray');
    if (storedUserArray) {
      this.storedUsers = JSON.parse(storedUserArray);
    }
  }

  login() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      const enteredEmail = this.userForm.get('email')?.value;
      this.userForm.get('name')?.value;
      const enteredPassword = this.userForm.get('password')?.value;
  
      const foundUser = this.storedUsers.find(user => user.email === enteredEmail && user.password === enteredPassword);
  
      if (foundUser) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
        
        this.router.navigate(['/welcome']);
      } else {
        alert("Invalid Credentials");
      }
    }, 2000);
  }
  
  getErrorMessageMail() {
    if (this.email.hasError('required')) {
      return 'You must enter a valid mail Id';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessagePassword(){
    if(this.password.hasError('required')){
      return 'You must enter a valid password';

    }
    return this.password.hasError('password') ? 'not a valid password' : '';
  }


  
}

