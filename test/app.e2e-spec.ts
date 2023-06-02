import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { useContainer } from 'class-validator';
import { faker } from '@faker-js/faker';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  const newUser = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: `${faker.person.firstName()}@gmail.com`,
    password: 'stratpoint',
    confirmPassword: 'stratpoint',
  };

  // const userResponse = expect.objectContaining({
  //   id: expect.any(String),
  //   firstName: expect(newUser.firstName),
  //   lastName: expect(newUser.lastName),
  //   email: expect(newUser.email),
  //   hashedPassword: expect.any(String),
  //   createdAt: expect.any(String),
  //   updatedAt: expect.any(String),
  //   birthday: expect(null),
  //   bio: expect(null),
  //   profilePicture: expect(null),
  // });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
  });

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });

  describe('POST /user', () => {
    describe('Positive Scenario(s)', () => {
      it('should create new user', async () => {
        const beforeCount = await prisma.user.count();

        const { status } = await request(app.getHttpServer())
          .post('/user')
          .send(newUser);

        const afterCount = await prisma.user.count();

        expect(status).toBe(201);
        expect(afterCount - beforeCount).toBe(1);
      });
    });

    describe('Negative Scenario(s)', () => {
      it('should catch ~ invalid email input', async () => {
        const { status, body } = await request(app.getHttpServer())
          .post('/user')
          .send({
            ...newUser,
            email: 'not-an-email',
          });

        expect(status).toBe(400);
        expect(body.message[0]).toBe('Invalid email format');
      });

      it('should catch ~ password is not 8+ chars', async () => {
        const { status, body } = await request(app.getHttpServer())
          .post('/user')
          .send({
            ...newUser,
            password: '1234567',
          });

        expect(status).toBe(400);
        expect(body.message[0]).toBe(
          'Minimum of 8 characters for password is required',
        );
      });

      it('should catch ~ password and confirm password does not match', async () => {
        const { status, body } = await request(app.getHttpServer())
          .post('/user')
          .send({
            ...newUser,
            password: '12345678',
            confirmPassword: '123456789',
          });

        expect(status).toBe(400);
        expect(body.message[0]).toBe(
          'Password and confirm password does not match',
        );
      });

      it('should catch ~ email already taken', async () => {
        const { status, body } = await request(app.getHttpServer())
          .post('/user')
          .send(newUser);

        expect(status).toBe(409);
        expect(body.message[0]).toBe('Email already taken');
      });
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({});
  });
});
