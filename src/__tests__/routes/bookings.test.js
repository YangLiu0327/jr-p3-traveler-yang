const supertest = require("supertest");
// const app = require("../../loaders/express"); //导入错了
const app = require("../../../app"); //正确写法
const Booking = require("../../models/booking");
const { connectToDB, disconnectDB } = require("../../loaders/mongoose");

// jest.useFakeTimers()

//  这里的app是express里创建的app
const request = supertest(app);

it("should return 201 if request is valid", async () => {
  // serve 要和数据库先连接上
  connectToDB();
  // console.log("xxxxxxxxx");
  const res = await request
    // .post("api/v1/bookings") //路径错了
    .post("/api/v1/bookings") //正确写法
    // .send({ user: "yang", tour: "sydney" }); //body 错了
    .send({ code: "22222", user: "yang", tour: "sydney" }); //正确写法
  expect(res.statusCode).toBe(201);
});

// npm test
// npm run test:watch



// npm test
// npm run test:watch
