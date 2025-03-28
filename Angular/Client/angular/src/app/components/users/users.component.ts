import { Atendente } from '../../types/users';
import { UsersService } from '../../services/users.service';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr, Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  imports: [],
  providers: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})

export class UsersComponent implements OnInit{

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
