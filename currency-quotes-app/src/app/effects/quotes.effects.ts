import {Injectable} from '@angular/core';
import {createEffect} from '@ngrx/effects';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {map, throttleTime} from 'rxjs/operators';
import {getQuotes} from '../actions/qoutes.actions';
import {Rate} from '../interfaces/rate.interface';

@Injectable()
export class QuotesEffects {
    private quotesSocket$: WebSocketSubject<string> = webSocket<string>({
        url: 'ws://localhost:3000',
        deserializer: (msg) => msg.data
    });

    loadQuotes$ = createEffect(() =>
        this.quotesSocket$.pipe(
            throttleTime(500),
            map((data: string) => {
                const quotes: Rate[] = JSON.parse(data);
                return getQuotes({quotes});
            })
        )
    );
}
