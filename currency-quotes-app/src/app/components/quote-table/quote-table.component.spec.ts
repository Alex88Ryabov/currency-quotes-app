import 'zone.js';
import 'zone.js/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuoteTableComponent } from './quote-table.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectAllQuotes } from '../../selectors/qoutes.selector';
import {Rate} from "../../interfaces/rate.interface";
import {Signal} from "@angular/core";

const mockQuotes: Signal<Rate[]> = [
  { time: '2024-10-17T10:00:00Z' as unknown as Date, symbol: 'EURUSD', bid: 1.1234, ask: 1.1235 },
  { time: '2024-10-17T10:00:01Z' as unknown as Date, symbol: 'GBPUSD', bid: 1.2345, ask: 1.2346 }
] as unknown as Signal<Rate[]>

describe('QuoteTableComponent', () => {
  let component: QuoteTableComponent;
  let fixture: ComponentFixture<QuoteTableComponent>;
  let store: MockStore;

  // Начальное состояние для тестирования
  const initialState = {
    quotes: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteTableComponent], // Добавляем компонент в imports
      providers: [
        provideMockStore({initialState}) // Добавляем провайдер для Store
      ]
    })
      .compileComponents();

    store = TestBed.inject(MockStore); // Получаем MockStore
    fixture = TestBed.createComponent(QuoteTableComponent);
    component = fixture.componentInstance;
    component.quotes = mockQuotes;

    store.overrideSelector(selectAllQuotes, initialState.quotes);

    // Убедитесь, что quotes корректно инициализированы в компоненте
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
