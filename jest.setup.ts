import '@testing-library/jest-dom';

process.env.VITE_API_URL = 'http://localhost:3000';

const originalError = console.error;
console.error = (...args: unknown[]) => {
  const firstArg = args[0];
  const message =
    firstArg && typeof firstArg === 'object' && 'message' in firstArg
      ? String((firstArg as { message: unknown }).message)
      : typeof firstArg === 'string'
        ? firstArg
        : '';

  if (message.includes('Not implemented: navigation')) {
    return;
  }
  originalError(...args);
};