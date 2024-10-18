import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { map, throttleTime } from 'rxjs/operators';
import { getQuotes } from '../actions/qoutes.actions';
import { Rate } from '../interfaces/rate.interface';

@Injectable()
export class QuotesEffects {
  // Создаем WebSocket соединение для получения котировок
  private quotesSocket$: WebSocketSubject<Rate[]> = webSocket<Rate[]>({
    url: 'ws://localhost:3000',
    // Десериализация полученных сообщений из WebSocket
    deserializer: (msg) => JSON.parse(msg.data)
  });

  // Эффект для загрузки котировок
  public loadQuotes$ = createEffect(() =>
    this.quotesSocket$.pipe(
      // Ограничиваем частоту обновлений до одного каждые 500 миллисекунд
      throttleTime(500),
      // Обработка полученных данных
      map((data: Rate[]) => {
        const quotes: Rate[] = this.processQuotes(data);

        // Возвращаем действие для обновления котировок в store
        return getQuotes({ quotes });
      })
    )
  );

  // Обработка котировок для корректного отображения
  public processQuotes(quotes: Rate[]): Rate[] {
    return quotes.map(quote => ({
      // Копируем существующие данные и обновляем bid
      ...quote,
      // Если bid больше ask приравниваем его значение к значению ask
      bid: quote.bid > quote.ask ? quote.ask : quote.bid
    }));
  }
}
