import { QuotesEffects } from './quotes.effects';
import { Rate } from '../interfaces/rate.interface';

describe('QuotesEffects', () => {
  let effects: QuotesEffects;

  beforeEach(() => {
    effects = new QuotesEffects();
  });

  describe('processQuotes', () => {
    it('should return quotes with correct bid values', () => {
      const inputQuotes: Rate[] = [
        { time: new Date(), symbol: 'USD/EUR', bid: 1.10, ask: 1.11 }, // bid < ask, поэтому bid остается тем же
        { time: new Date(), symbol: 'USD/GBP', bid: 0.85, ask: 0.85 }, // bid == ask, поэтому bid остается тем же
        { time: new Date(), symbol: 'USD/JPY', bid: 110.50, ask: 110.40 } // bid > ask, поэтому bid становится равным ask
      ];

      const processedQuotes = effects.processQuotes(inputQuotes);

      expect(processedQuotes[0].bid).toBe(1.10); // bid < ask, поэтому bid остается тем же
      expect(processedQuotes[1].bid).toBe(0.85); // bid == ask, поэтому bid остается тем же
      expect(processedQuotes[2].bid).toBe(110.40); // bid > ask, поэтому bid становится равным ask
    });
  });
});
