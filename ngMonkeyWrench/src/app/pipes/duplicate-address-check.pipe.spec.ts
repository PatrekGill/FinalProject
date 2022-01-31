import { DuplicateAddressCheckPipe } from './duplicate-address-check.pipe';

describe('DuplicateAddressCheckPipe', () => {
  it('create an instance', () => {
    const pipe = new DuplicateAddressCheckPipe();
    expect(pipe).toBeTruthy();
  });
});
