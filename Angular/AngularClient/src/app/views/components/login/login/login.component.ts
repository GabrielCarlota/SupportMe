import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginFormComponent } from '../login-form/login-form.component';
import { Panel } from 'primeng/panel';


@Component({
  selector: 'app-login',
  imports: [LoginFormComponent, Panel],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
