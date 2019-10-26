const db = require("../data/dbConfig.js");

const Users = require("./users-model.js");

describe("users model", () => {
    afterEach(async () => {
        // this function executes and clears out the table before each test
        await db('user').truncate();
    });
    describe("addNewUser()", () => {

        it("should insert a new user into the database", async () => {
            await Users.addNewUser({ email: "herman@cat.com", password: "I<3catnip" })
            await Users.addNewUser({ email: "boo@cat.com", password: "feedme!" })

            const users = await db("user");

            expect(users).toHaveLength(2)
        })
    })
    describe("getUserById(id)", () => {
        it("should get all users in the database", async () => {
            await Users.addNewUser({ email: "herman@cat.com", password: "I<3catnip" })
            const user = await Users.getUserById(1);

            expect(user.email).toBe("herman@cat.com")
        })
    })

    describe("deleteUser()", () => {
        it("should delete user", async () => {
            await Users.addNewUser({ email: "herman@cat.com", password: "I<3catnip" })
            await Users.addNewUser({ email: "boo@cat.com", password: "feedme!" })
            await Users.deleteUser(1)
            const user = await Users.getUserById(1);

            expect(user).toBe(undefined)
        })
    })
})