import { provideNgDocApp, provideSearchEngine, NgDocDefaultSearchEngine, providePageSkeleton, NG_DOC_DEFAULT_PAGE_SKELETON, provideMainPageProcessor, NG_DOC_DEFAULT_PAGE_PROCESSORS } from "@ng-doc/app";
import { NG_DOC_ROUTING, provideNgDocContext } from "@ng-doc/generated";
import { provideRouter, withInMemoryScrolling } from "@angular/router";
import { provideHttpClient, withInterceptorsFromDi, withFetch } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
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
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(NG_DOC_ROUTING, withInMemoryScrolling({scrollPositionRestoration: "enabled", anchorScrolling: "enabled"})),
        provideHttpClient(withInterceptorsFromDi(), withFetch()),
        provideNgDocContext(),
        provideNgDocApp(),
        provideSearchEngine(NgDocDefaultSearchEngine),
        providePageSkeleton(NG_DOC_DEFAULT_PAGE_SKELETON),
        provideMainPageProcessor(NG_DOC_DEFAULT_PAGE_PROCESSORS)
    ],
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


