const bcrypt = require("bcrypt");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const connectdb = require("../../../database/connectdb");
const User = require("../../../database/models/User");
const { registerUser, loginUser } = require("./userControllers");

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

  await User.create({
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
          password: "1234",
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

describe("Given a login user controller", () => {
  describe("When it receives a req with a logged user and a res", () => {
    test("Then it should wall method json of res with a token", async () => {
      const username = registeredUsername;
      const password = "1234";
      const mockJson = jest.fn();
      const req = { body: { username, password } };
      const res = { json: mockJson };
      const next = null;

      await loginUser(req, res, next);

      expect(mockJson).toHaveBeenCalled();
      expect(mockJson.mock.calls[0][0]).toHaveProperty("token");
    });
  });

  describe("When it receves a req with an invalid username", () => {
    test("Then it should call methods status and json of res with 409 and { error: 'invalid username or password' }", async () => {
      const username = "paco";
      const password = "1234";
      const mockJson = jest.fn();
      const mockStatus = jest.fn().mockReturnThis();
      const req = { body: { username, password } };
      const res = { json: mockJson, status: mockStatus };
      const next = null;
      const expectedJson = { error: "invalid username or password" };
      const expectedStatus = 409;

      await loginUser(req, res, next);

      expect(mockJson).toHaveBeenCalledWith(expectedJson);
      expect(mockStatus).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it receives a username and password in req but the connection with database fails", () => {
    const mockUser = () => ({
      findOne: jest.fn().mockImplementation(() => {
        throw new Error("error");
      }),
    });
    jest.mock("../../../database/models/User", () => mockUser);
    test("Then it should call function next", async () => {
      const username = "paco";
      const password = "1234";
      const req = { body: { username, password } };
      const res = null;
      const next = jest.fn();

      await loginUser(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
