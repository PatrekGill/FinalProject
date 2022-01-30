import { UserAddressesPipe } from './user-addresses.pipe';

describe('UserAddressesPipe', () => {
  it('create an instance', () => {
    const pipe = new UserAddressesPipe();
    expect(pipe).toBeTruthy();
  });
});
