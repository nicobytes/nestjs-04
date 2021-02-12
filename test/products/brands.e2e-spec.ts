import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpServer, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { Connection } from 'typeorm';
import { getConnectionToken } from '@nestjs/typeorm';


import { E2EModule } from '../e2e.module';
import { ProductsModule } from '../../src/products/products.module';

describe('BrandsController (e2e)', () => {
  const endpoint = '/api/brands';
  let app: INestApplication;
  let httpServer: HttpServer;
  let connection: Connection;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [E2EModule, ProductsModule],
    })
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
    httpServer = app.getHttpServer();
    connection = moduleFixture.get(getConnectionToken('writeConnection'));


  });

  describe('/api/v1/brands/', () => {
    it('should return a user with admin role with master program', () => {
      const mockUser = {
        is_admin: true,
        is_master: true,
        email: 'admin-master@email.com',
        user_id: 1111,
      };

      return request(httpServer)
        .post(endpoint)
        .send({
          email: 'admin-master@email.com',
          password: '1234',
        })
        .expect(HttpStatus.CREATED)
        .then(({ body }) => {
          expect(body).toHaveProperty('access_token');
          expect(body.user.email).toEqual(mockUser.email);
          expect(body.user.program.name).toEqual('Master');
          expect(body.user.isMaster).toEqual(true);
          expect(body.user.isStartup).toEqual(false);
        });
    });

  });

  afterAll(async () => {
    await app.close();
  });
});