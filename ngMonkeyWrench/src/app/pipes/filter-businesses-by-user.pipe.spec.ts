import { FilterBusinessesByUserPipe } from './filter-businesses-by-user.pipe';

describe('FilterBusinessesByUserPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterBusinessesByUserPipe();
    expect(pipe).toBeTruthy();
  });
});
