import { BankStore } from '../index';
test('BankStore Constructor', () => {
  expect(new BankStore('merchantCode', 'terminal', 'password')).toBe(BankStore);
});