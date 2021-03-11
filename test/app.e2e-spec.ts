import { AppModule } from '@app/app.module';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

describe('HealthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /healthz', () => {
    return request(app.getHttpServer())
      .get('/healthz')
      .expect(HttpStatus.OK);
  });

  it('GET /robots.txt', () => {
    return request(app.getHttpServer())
      .get('/robots.txt')
      .expect(HttpStatus.OK);
  });

  it('GET /api', () => {
    return request(app.getHttpServer())
      .get('/api')
      .expect(HttpStatus.OK);
  });
});
