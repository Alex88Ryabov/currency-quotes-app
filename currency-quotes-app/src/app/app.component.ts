import {Component} from '@angular/core';
import {QuoteTableComponent} from "./components/quote-table/quote-table.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [QuoteTableComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
