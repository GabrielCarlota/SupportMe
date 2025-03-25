import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/components/login/login.component';
import { SignupComponent } from './app/components/signup/signup.component';

const routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
