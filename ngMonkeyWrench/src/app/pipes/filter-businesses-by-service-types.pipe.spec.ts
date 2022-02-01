import { FilterBusinessesByServiceTypesPipe } from './filter-businesses-by-service-types.pipe';

describe('FilterBusinessesByServiceTypesPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterBusinessesByServiceTypesPipe();
    expect(pipe).toBeTruthy();
  });
});
