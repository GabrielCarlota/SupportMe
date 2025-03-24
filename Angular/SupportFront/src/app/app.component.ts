import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormAtendimentosComponent } from "./form-atendimentos/form-atendimentos.component";
import { FormAgendamentosComponent } from "./form-agendamentos/form-agendamentos.component";

@Component({
  selector: 'app-root',
  imports: [FormAtendimentosComponent, FormAgendamentosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SupportFront';
}
