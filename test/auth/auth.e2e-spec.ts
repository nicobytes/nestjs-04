import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpServer, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { Connection } from 'typeorm';
import { getConnectionToken } from '@nestjs/typeorm';


import { E2EModule } from '../e2e.module';
import { ProductsModule } from '../../src/products/products.module';

describe('AuthController (e2e)', () => {
  const endpoint = '/api/v1/auth';
  let app: INestApplication;
  let httpServer: HttpServer;
  let connection: Connection;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [E2EModule, ProductsModule, AuthModule, UsersModule],
    })
      .overrideProvider(PlatziAuthService)
      .useValue({
        validateUser: () => {
          return {};
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
    httpServer = app.getHttpServer();
    connection = moduleFixture.get(getConnectionToken('writeConnection'));
    platziAuthService = moduleFixture.get(PlatziAuthService);

    await connection
      .createQueryBuilder()
      .insert()
      .into(Program)
      .values([{ name: 'Master' }, { name: 'Startup' }])
      .execute();
  });

  describe('/api/v1/auth/', () => {
    it('should return a user with admin role with master program', () => {
      const mockUser = {
        ...platziUser,
        is_admin: true,
        is_master: true,
        email: 'admin-master@email.com',
        user_id: 1111,
      };
      jest.spyOn(platziAuthService, 'validateUser').mockResolvedValue(mockUser);

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
          expect(body.user.role).toEqual(UserRole.ADMIN);
          expect(body.user.program.name).toEqual('Master');
          expect(body.user.isMaster).toEqual(true);
          expect(body.user.isStartup).toEqual(false);
        });
    });

    it('should return a user with admin role with startup program', () => {
      const mockUser = {
        ...platziUser,
        is_admin: true,
        is_startup: true,
        email: 'admin-startup@email.com',
        user_id: 1112,
      };
      jest.spyOn(platziAuthService, 'validateUser').mockResolvedValue(mockUser);

      return request(httpServer)
        .post(endpoint)
        .send({
          email: 'admin-startup@email.com',
          password: '1234',
        })
        .expect(HttpStatus.CREATED)
        .then(({ body }) => {
          expect(body).toHaveProperty('access_token');
          expect(body.user.email).toEqual(mockUser.email);
          expect(body.user.role).toEqual(UserRole.ADMIN);
          expect(body.user.program.name).toEqual('Startup');
          expect(body.user.isMaster).toEqual(false);
          expect(body.user.isStartup).toEqual(true);
        });
    });

    it('should return a user with coach role with master program', () => {
      const mockUser = {
        ...platziUser,
        is_coach: true,
        is_master: true,
        email: 'coach-master@email.com',
        user_id: 2222,
      };
      jest.spyOn(platziAuthService, 'validateUser').mockResolvedValue(mockUser);

      return request(httpServer)
        .post(endpoint)
        .send({
          email: 'coach-master@email.com',
          password: '1234',
        })
        .expect(HttpStatus.CREATED)
        .then(({ body }) => {
          expect(body).toHaveProperty('access_token');
          expect(body.user.email).toEqual(mockUser.email);
          expect(body.user.role).toEqual(UserRole.COACH);
          expect(body.user.program.name).toEqual('Master');
          expect(body.user.isMaster).toEqual(true);
          expect(body.user.isStartup).toEqual(false);
        });
    });

    it('should return a user with coach role with startup program', () => {
      const mockUser = {
        ...platziUser,
        is_coach: true,
        is_startup: true,
        email: 'coach-startup@email.com',
        user_id: 2221,
      };
      jest.spyOn(platziAuthService, 'validateUser').mockResolvedValue(mockUser);

      return request(httpServer)
        .post(endpoint)
        .send({
          email: 'coach-startup@email.com',
          password: '1234',
        })
        .expect(HttpStatus.CREATED)
        .then(({ body }) => {
          expect(body).toHaveProperty('access_token');
          expect(body.user.email).toEqual(mockUser.email);
          expect(body.user.role).toEqual(UserRole.COACH);
          expect(body.user.program.name).toEqual('Startup');
          expect(body.user.isMaster).toEqual(false);
          expect(body.user.isStartup).toEqual(true);
        });
    });

    it('should return a user with student role with master program', () => {
      const mockUser = {
        ...platziUser,
        is_master: true,
        email: 'student-master@email.com',
        user_id: 3333,
      };
      jest.spyOn(platziAuthService, 'validateUser').mockResolvedValue(mockUser);

      return request(httpServer)
        .post(endpoint)
        .send({
          email: 'student@email.com',
          password: '1234',
        })
        .expect(HttpStatus.CREATED)
        .then(({ body }) => {
          expect(body).toHaveProperty('access_token');
          expect(body.user.email).toEqual(mockUser.email);
          expect(body.user.role).toEqual(UserRole.STUDENT);
          expect(body.user.program.name).toEqual('Master');
          expect(body.user.isMaster).toEqual(true);
          expect(body.user.isStartup).toEqual(false);
        });
    });

    test('should return a user with student role with startup program', () => {
      const mockUser = {
        ...platziUser,
        is_startup: true,
        email: 'student-startup@email.com',
        user_id: 4444,
      };
      jest.spyOn(platziAuthService, 'validateUser').mockResolvedValue(mockUser);

      return request(httpServer)
        .post(endpoint)
        .send({
          email: 'student-startup@email.com',
          password: '1234',
        })
        .expect(HttpStatus.CREATED)
        .then(({ body }) => {
          expect(body).toHaveProperty('access_token');
          expect(body.user.email).toEqual(mockUser.email);
          expect(body.user.role).toEqual(UserRole.STUDENT);
          expect(body.user.program.name).toEqual('Startup');
          expect(body.user.isMaster).toEqual(false);
          expect(body.user.isStartup).toEqual(true);
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});