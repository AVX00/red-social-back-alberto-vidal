const { registerUser } = require("./userControllers");

beforeAll(() => {
  const mockUser = { create: jest.fn().mockResolvedValue(null) };
  jest.mock("../../database/models/User", () => mockUser);
});
afterAll(() => {
  jest.resetAllMocks();
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
});
