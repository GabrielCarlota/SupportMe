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
  import {
    ActivatedRoute,
    NavigationEnd,
    Router,
    RouterLink,
  } from '@angular/router';
  import { filter, mergeMap, map } from 'rxjs';
  import { ToggleSwitchModule } from 'primeng/toggleswitch';
  import { InputSwitchModule } from 'primeng/inputswitch';
  import { FormsModule } from '@angular/forms';

  @Component({
    selector: 'app-navbar',
    imports: [
      RouterLink,
      DrawerModule,
      Button,
      Menubar,
      BadgeModule,
      AvatarModule,
      InputTextModule,
      Ripple,
      CommonModule,
      ToggleSwitchModule,
      InputSwitchModule,
      FormsModule
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
  })
  export class NavbarComponent implements OnInit {

    title = '';

    constructor(private router: Router, private route: ActivatedRoute) {
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let current = this.route.root;
          while(current.firstChild){
            current = current.firstChild
          }
          return current
        }),
        mergeMap(route => route.data)
      ).subscribe(data => {
        this.title = data['title'] || '';
      })
    }

    drawerVisible: boolean = false;

    items: MenuItem[] | undefined;

    ngOnInit(): void {
      this.items = [
        {
          label: 'home',
          icon: 'pi pi-bars',
        },
      ];
    }
  }
