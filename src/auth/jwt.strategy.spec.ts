import { JwtStrategy } from '@app/auth/jwt.strategy';
import authConfig from '@app/config/auth.config';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(authConfig), PassportModule],
      providers: [JwtStrategy],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });

  describe('validate', () => {
    it('should return the token objects for correctly namespaced claim', () => {
      const mockPayload = {
        'http://test-url/syndication-tokens': {
          facebook: {
            token: 'a token',
            pageId: 'a page',
          },
          twitter: {
            token: 'a twitter token',
            tokenSecret: 'a token secret',
          },
        },
        iss: 'https://elevate-dev.us.auth0.com/',
        sub: 'google-apps|mbondi@tryelevate.com',
        aud: ['urn:elevate-dev:crm:elevate', 'https://elevate-dev.us.auth0.com/userinfo'],
        iat: 1610657230,
        exp: 1610743630,
        azp: '3kcPvmw9L29kej4BuC47kkfPTcX4Uylb',
        scope: 'openid profile email syndication',
      };

      const expected = {
        facebook: {
          token: 'a token',
          pageId: 'a page',
        },
        twitter: {
          token: 'a twitter token',
          tokenSecret: 'a token secret',
        },
      };

      expect(jwtStrategy.validate(mockPayload)).toStrictEqual(expected);
    });

    it('should throw UnauthorizedException for missing claims', () => {
      const mockPayload = {
        scope: 'email',
      };

      expect(() => jwtStrategy.validate(mockPayload)).toThrow();
    });

    it('should throw UnauthorizedException for empty JWT payloads', () => {
      expect(() => jwtStrategy.validate(null)).toThrow();
      expect(() => jwtStrategy.validate({})).toThrow();
    });
  });
});
