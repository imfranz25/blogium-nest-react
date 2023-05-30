import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { useContainer } from 'class-validator';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  const newUser = {
    firstName: 'test',
    lastName: 'test',
    email: 'test@gmail.com',
    password: 'super-secret',
    confirmPassword: 'super-secret',
  };

  const dummyUser = {
    firstName: 'dummy',
    lastName: 'dummy',
    email: 'dummy@gmail.com',
    hashedPassword: 'super-secret',
  };

  const postShape = expect.objectContaining({
    id: expect.any(String),
    firstName: expect(newUser.firstName),
    lastName: expect(newUser.lastName),
    email: expect(newUser.email),
    hashedPassword: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
    await prisma.user.create({ data: dummyUser });
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('POST /user', () => {
    it('returns the newly created user', async () => {
      const beforeCount = await prisma.user.count();

      const { status } = await request(app.getHttpServer())
        .post('/user')
        .send(newUser);

      const afterCount = await prisma.user.count();

      expect(status).toBe(201);
      expect(afterCount - beforeCount).toBe(1);
    });

    it('fail user creation without email', async () => {
      const { status } = await request(app.getHttpServer()).post('/user').send({
        firstName: 'test',
        lastName: 'test',
        hashedPassword: 'secret',
      });

      expect(status).toBe(400);
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({});
  });
});
