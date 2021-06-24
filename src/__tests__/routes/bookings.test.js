const supertest = require('supertest');
const app = require('../../loaders/express');
const Booking = require('../../models/booking');
const { connectToDB, disconnectDB } = require('../../loaders/mongoose');

// jest.useFakeTimers()

//  这里的app是express里创建的app
const request = supertest(app);


it('should return 201 if request is valid',  async () => {
    // serve 要和数据库先连接上
    connectToDB();
    // console.log("xxxxxxxxx");
    const res = await request 
        .post('api/v1/bookings')
        .send({user:'yang', tour:'sydney'});
    expect(res.statusCode).toBe(201);
})





// npm test
// npm run test:watch
