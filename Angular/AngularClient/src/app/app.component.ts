import { MyPreset } from './assets/themes/mytheme';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Card } from 'primeng/card';
import { Panel } from 'primeng/panel';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[MessageService]
})
export class AppComponent {

  constructor(){}

  title = 'AngularClient';

}
