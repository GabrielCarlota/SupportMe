import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component'; // ✅ Correct Import

@NgModule({
  declarations: [AppComponent], // ✅ Ensure AppComponent is declared
  imports: [BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
