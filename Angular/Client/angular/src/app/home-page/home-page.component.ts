import { Component, inject } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Atendente } from '../types/users';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  users!:Observable<Atendente[]>
  UserHttp = inject (UsersService);

  constructor(private toast:ToastrService){}

  ShowSuccees(){
    this.toast.success('Saved', 'Salvo com sucesso', {closeButton:true})
  }

  ngOnInit(): void {
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


}
