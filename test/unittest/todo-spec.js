var request = require('supertest');

describe('test todos api', function () {
    var server;
    beforeEach(function () {
        server = require('../../server');
    });

    it('should get todos', function (done) {
        request(server)
            .get('/api/todos')
            .expect(200, done);
    });

    var toDelete = '';

    it('should add a todo', function (done) {
        request(server)
            .post('/api/todos')
            .send({text: 'Hoi'})
            .expect(function (res) {
                toDelete = res.body[0]._id;
            })
            .end(done);
    });

    it('should delete a todo', function (done) {
        request(server)
            .delete('/api/todos/' + toDelete)
            .expect(200, done);
    });
});