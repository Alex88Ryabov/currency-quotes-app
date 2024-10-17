import { NgDocRootComponent, NgDocNavbarComponent, NgDocSidebarComponent } from "@ng-doc/app";
import {Component, Signal} from '@angular/core';
import {QuoteTableComponent} from "./components/quote-table/quote-table.component";
import {Rate} from "./interfaces/rate.interface";
import {toSignal} from "@angular/core/rxjs-interop";
import {selectAllQuotes} from "./selectors/qoutes.selector";
import {Meta} from "@angular/platform-browser";
import {Store} from "@ngrx/store";
import {IState} from "./interfaces/state.interface";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [QuoteTableComponent, NgDocRootComponent, NgDocNavbarComponent, NgDocSidebarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  public quotes: Signal<Rate[]> = toSignal(this.store.select(selectAllQuotes), {initialValue: []});

  constructor(private meta: Meta, private store: Store<IState>) {
    this.setMetaDescription();
  }

  private setMetaDescription() {
    this.meta.updateTag({name: 'description', content: 'Some text'}); // this need for SEO
  }
}
