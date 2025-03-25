import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent implements OnInit{

  type: string = "password";
  isText: boolean = false;
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService){}

  ngOnInit(): void {
    console.log("componente incializado")
  }

  OnLogin(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
    }
  }
}

