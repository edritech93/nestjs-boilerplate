import { UserModel } from './user.model';

describe('UserDto', () => {
  it('should be defined', () => {
    expect(new UserModel()).toBeDefined();
  });
});
