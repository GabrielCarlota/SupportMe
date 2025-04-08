import { Component } from '@angular/core';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { Panel } from 'primeng/panel';

@Component({
  selector: 'app-register',
  imports: [Panel ,RegisterFormComponent ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
