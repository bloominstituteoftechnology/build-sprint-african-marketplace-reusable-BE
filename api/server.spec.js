const request = require("supertest");

const server = require("./server.js");
const db = require("../data/dbConfig.js");

describe("server.js", () => {
    afterEach(async () => {
        // this function executes and clears out the table before each test
        await db('user').truncate();
    });

    describe("index route", () => {
        it('should return an HTTP status code 200 OK', async () => {
            const response = await request(server).get("/");

            expect(response.status).toEqual(200);
        })

        it('should return a JSON object fron the index route', async () => {
            const response = await request(server).get('/');

            expect(response.type).toEqual('text/html');
        });
    })
    describe("the testing database", () => {
        it("should be empty", async () => {
            const res = await request(server).get("/api/users/");
            expect(res.body.length).toEqual(0);
        })

        it("should insert a new user into the database", async () => {
            await request(server).post("/api/auth/register").send({ email: "admin@email.com", password: "123456" }).set('Accept', 'application/json').expect('Content-Type', /json/).expect(201)

            const res = await request(server).get("/api/users/");
            expect(res.status).toEqual(200);
            expect(res.body.length).toEqual(1);
            expect(res.body[0].email).toBe("admin@email.com")
        })

        it("GET/ users should respond with a status of 200 OK", async () => {
            request(server).get("/users").expect(200)
            request(server).get("/users/1").expect(200)
        })

        it('expect response to be json', async () => {
            await request(server).post("/api/auth/register").send({ email: "admin@email.com", password: "123456" }).set('Accept', 'application/json').expect('Content-Type', /json/).expect(201)

            await request(server).post("/api/auth/login").send({ email: "admin@email.com", password: "123456" }).set('Accept', 'application/json').expect('Content-Type', /json/).expect(200)
        })

    })

})