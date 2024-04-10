import { DiscordAuthenticationMiddleware } from './discord-authentication.middleware';

describe('DiscordAuthenticationMiddleware', () => {
  it('should be defined', () => {
    expect(new DiscordAuthenticationMiddleware()).toBeDefined();
  });
});
