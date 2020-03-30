import request from 'supertest';
import '../../src/bootstrap';
import server from '../../src/app';

describe('Event Controller', () => {
  test('List events', done => {
    return request(server)
      .get('/')
      .expect(200)
      .then(res => {
        expect(res.body).toHaveProperty('count');
        expect(res.body).toHaveProperty('rows');
        done();
      });
  });
});
