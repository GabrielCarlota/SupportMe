import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PrimeNG, providePrimeNG } from 'primeng/config';
import { CascadeSelect, CascadeSelectModule } from 'primeng/cascadeselect';
import { ClienteService } from '../../../services/cliente.service';
import { Clientes } from '../../../interfaces/cliente';
import { FormsModule } from '@angular/forms'
import { CardModule} from 'primeng/card';

@Component({
  selector: 'app-homepage',
  imports: [ButtonModule, FormsModule, CardModule],
  providers:[],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{

  clienteSelecionado: { label: string, value: number } | null = null;
  clientes:any | undefined
  clientesList!: Clientes[]


  constructor(private primeng: PrimeNG, private servicoCliente: ClienteService) {  }

  ngOnInit(): void {

    this.servicoCliente.getClientes().subscribe({next:(value)=> {
      this.clientesList = value
      console.log(value);
    },
  error(err) {
    console.log(err?.err.error);
  },})
  }

  toogleDarkMode(){
    const element = document.querySelector('html');
    if(element!==null){
      element.classList.toggle('.my-app-dark');
    }
  }

}
