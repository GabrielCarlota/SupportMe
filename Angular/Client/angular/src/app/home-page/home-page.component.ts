import { Component, inject } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Atendente } from '../types/users';
import { AtendimentosService } from '../services/atendimentos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  users!:Observable<Atendente[]>
  UserHttp = inject (UsersService);
  serico = inject (AtendimentosService);

  constructor(private toast:ToastrService, private http: HttpClient, private service: AtendimentosService){}

  ShowSuccees(){
    this.toast.success('Saved', 'Salvo com sucesso', {closeButton:true})
  }

  ngOnInit(){
    this.serico.getAtendimentos().
    subscribe({
      next:(res)=>{
        console.log("Os dados são: ",res);

      },
      error:(err) => {
        console.log(err?.err.error);

      },
    })
  }

 /* ngOnInit(): void {
    this.UserHttp.getUsers().
    subscribe({
      next:(res)=>{
        console.log(res);

      },
      error:(err)=>{
        console.log(err?.err.error)
      }
    })
  }

*/
}
