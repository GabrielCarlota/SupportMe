import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-not-found',
  imports: [PanelModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
  providers:[Router]
})
export class NotFoundComponent {

  constructor(private router: Router) {  }

  toHomePage(){
    this.router.navigateByUrl('/login')
  }
}
