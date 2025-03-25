// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [], // Inclua o AppComponent aqui
  imports: [BrowserModule],
  providers: [],
  bootstrap: [] // O AppComponent vai para o array de bootstrap
})
export class AppModule {}
