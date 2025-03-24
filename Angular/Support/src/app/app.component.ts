import { Component } from '@angular/core';
import { DataTableComponent } from './components/data-table/data-table.component';

@Component({
  selector: 'app-root',
  standalone: true, // Ensure this is standalone
  imports: [DataTableComponent], // Import the DataTableComponent
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'support';
}
