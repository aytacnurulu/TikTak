import formatDate from './formatDate';

describe('formatDate', () => {
  it('returns "-" when value is undefined', () => {
    expect(formatDate(undefined)).toBe('-');
  });

  it('returns "-" when value is null', () => {
    expect(formatDate(null)).toBe('-');
  });

  it('returns "-" when value is an empty string', () => {
    expect(formatDate('')).toBe('-');
  });

  it('returns "-" when value is an invalid date string', () => {
    expect(formatDate('not-a-date')).toBe('-');
  });

  it('formats a valid ISO date string', () => {
    const result = formatDate('2026-03-05T10:30:00Z');
    expect(result).toMatch(/^\d{2}\.\d{2}\.\d{4}$/);
  });
});