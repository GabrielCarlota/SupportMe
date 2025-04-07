import { DrawerModule } from 'primeng/drawer';
import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, DrawerModule, Button, Menubar, BadgeModule, AvatarModule, InputTextModule, Ripple, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit{

  constructor(){}


  drawerVisible:boolean = false;

  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [{
      label: 'home',
      icon: 'pi pi-bars'
    }]
  }
}
