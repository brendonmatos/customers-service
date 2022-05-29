import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';


const uuidRegexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;


describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/customers (POST)', async () => {
    const test = await request(app.getHttpServer())
      .post('/customers')
      .send({
        name: 'John Doe',
        document: '12345678910',
      })

    expect(test.status).toBe(201);
    expect(test.body).toHaveProperty('id');
    expect(test.body.id).toMatch(uuidRegexExp);
    expect(test.body).toHaveProperty('name', 'John Doe');
    expect(test.body).toHaveProperty('document', '12345678910');
  })

  it('/customers/:id (GET)', async () => {
    const createTest = await request(app.getHttpServer())
      .post('/customers')
      .send({
        name: 'John Doe',
        document: '12345678910',
      })

    const getTest = await request(app.getHttpServer())
      .get('/customers/' + createTest.body.id)

    expect(getTest.status).toBe(200);
    expect(getTest.body).toHaveLength(1);
    expect(getTest.body[0]).toHaveProperty('name', 'John Doe');
    expect(getTest.body[0]).toHaveProperty('document', '12345678910');
  })


});
