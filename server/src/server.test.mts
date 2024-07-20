import { init } from './server.mjs';

describe('Server', () => {
  it('should work', () => {
    expect(init()).to.be.ok;
  });
});
