import { Component } from '@angular/core';
import { ClienteTableComponent } from "../cliente-table/cliente-table.component";

@Component({
  selector: 'app-cliente',
  imports: [ClienteTableComponent],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {

}
