import formatDate from './formatDate';

describe('formatDate', () => {
  it('formats a standard ISO date as dd.mm.yyyy', () => {
    expect(formatDate('2026-03-05T10:30:00Z')).toBe('05.03.2026');
  });

  it('pads single-digit day and month with a leading zero', () => {
    expect(formatDate('2026-01-09T00:00:00Z')).toBe('09.01.2026');
  });

  it('formats a date without time component', () => {
    expect(formatDate('2026-12-25')).toBe('25.12.2026');
  });
});