import {ChangeDetectionStrategy, Component, Signal} from '@angular/core';
import {Rate} from '../../interfaces/rate.interface';
import {Meta} from '@angular/platform-browser';
import {DatePipe} from '@angular/common';
import {HttpClient} from "@angular/common/http";
import {IState} from "../../interfaces/state.interface";
import {Store} from "@ngrx/store";
import {selectAllQuotes} from "../../selectors/qoutes.selector";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-quote-table',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './quote-table.component.html',
  styleUrls: ['quote-table.component.scss'],
  providers: [HttpClient],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteTableComponent {
  public quotes: Signal<Rate[]> = toSignal(this.store.select(selectAllQuotes), {initialValue: []});

  constructor(private meta: Meta, private store: Store<IState>) {
    this.setMetaDescription();
  }

  private setMetaDescription() {
    this.meta.updateTag({name: 'description', content: 'Some text'}); // this need for SEO
  }
}
