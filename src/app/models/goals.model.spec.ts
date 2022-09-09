import { Goals } from './goals.model';

describe('Goals', () => {
  it('should create an instance', () => {
    const date = new Date();
    expect(new Goals(1, "test" , "test description", date, 20, 0, "none")).toBeTruthy();
  });
});
