import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {ApplicationConfig, importProvidersFrom} from "@angular/core";
import {StoreModule} from '@ngrx/store';
import {quotesReducer} from "./app/reducers/quotes.reducer";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";
import {QuotesEffects} from "./app/effects/quotes.effects";

const store = StoreModule.forRoot({QuotesState: quotesReducer});
const storeDevTool = StoreDevtoolsModule.instrument({maxAge: 50, logOnly: true});
const effects = EffectsModule.forRoot(QuotesEffects);

const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(store),
    importProvidersFrom(storeDevTool),
    importProvidersFrom(effects),
    ],
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


