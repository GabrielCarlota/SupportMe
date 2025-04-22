import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PrimeNG, providePrimeNG } from 'primeng/config';
import { CascadeSelect, CascadeSelectModule } from 'primeng/cascadeselect';
import { ClienteService } from '../../../services/cliente.service';
import { Clientes } from '../../../interfaces/cliente';
import { FormsModule } from '@angular/forms'
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-homepage',
  imports: [ButtonModule, FormsModule, CardModule],
  providers: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {

  imagem = '/src/app/assets/img/images.png';

  constructor() { }

  ngOnInit(): void {

  }
}
