const bcrypt = require("bcrypt");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const connectdb = require("../../database/connectdb");
const User = require("../../database/models/User");
const { registerUser } = require("./userControllers");

let database;
beforeAll(async () => {
  database = await MongoMemoryServer.create();
  const uri = database.getUri();
  await connectdb(uri);
});

let registeredUsername;
let registeredName;
let registeredPassword;

beforeEach(async () => {
  registeredPassword = await bcrypt.hash("1234", 3);
  registeredName = "paco";
  registeredUsername = "packs";

  User.create({
    name: registeredName,
    username: registeredUsername,
    password: registeredPassword,
  });
});

afterEach(async () => {
  await User.deleteMany({});
});
afterAll(() => {
  mongoose.connection.close();
  database.stop();
});

describe("Given a register user controller", () => {
  describe("When it's called passing a req and res wit ha user in req body", () => {
    test("Then it should call methods status and json of res with 201 and  {user: 'username' created}", async () => {
      const username = "joselit0";
      const name = "joselito";
      const password = "1234";
      const mockStatus = jest.fn().mockReturnThis();
      const mockJson = jest.fn();
      const req = { body: { username, name, password } };
      const res = { status: mockStatus, json: mockJson };
      const next = null;
      const expectedStatus = 201;
      const expectedJson = { user: "joselit0 created" };

      await registerUser(req, res, next);

      expect(mockStatus).toHaveBeenCalledWith(expectedStatus);
      expect(mockJson).toHaveBeenCalledWith(expectedJson);
    });
  });

  describe("When it receibes a req with a user already regstered and next function", () => {
    test("Then next function should be called and not res methods status and json ", async () => {
      const mockStatus = jest.fn().mockReturnThis();
      const mockJson = jest.fn();
      const req = {
        body: {
          name: registeredName,
          username: registeredUsername,
          password: registeredPassword,
        },
      };
      const res = { status: mockStatus, json: mockJson };
      const next = jest.fn();
      await registerUser(req, res, next);

      expect(mockStatus).not.toHaveBeenCalled();
      expect(mockJson).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
});
