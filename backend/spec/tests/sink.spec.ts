import supertest from 'supertest';
import StatusCodes from 'http-status-codes';
import { SuperTest, Test } from 'supertest';
import request from 'supertest';

import app from '@server';
import Server from '../../src/Server'



describe('log time', () => {

    const path = '/api/log';

    const { NOT_FOUND, OK } = StatusCodes;
    let agent: SuperTest<Test>;

    beforeAll((done) => {
        agent = supertest.agent(app);
        done();
    });

    describe(`test /log availability`, () => {

        it(`post should return OK`, async () => {
            // Arrange
            
            // Act
            const req = await (request(Server).post(path))
            // Assert
            // Call API
            expect(req.status).toEqual(OK)
        });

        it(`get should return NOT_FOUND`, async () => {
            // Arrange
            
            // Act
            const req = await (request(Server).get(path))
            // Assert
            // Call API
            expect(req.status).toEqual(NOT_FOUND)
        });

    });

});
