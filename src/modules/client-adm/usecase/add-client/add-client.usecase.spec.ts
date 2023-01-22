import { AddClientUseCase } from "./add-client.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  };
};

describe("Add Client Use Case unit test", () => {
  it("should add a client", async () => {
    const clientRepository = MockRepository();

    const addClientUseCase = new AddClientUseCase(clientRepository);

    const input = {
      name: "Client 1",
      email: "client@mail.com",
      address: "Street 1, 1111, City y",
    };
    const result = await addClientUseCase.execute(input);

    expect(clientRepository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.email).toBe(input.email);
    expect(result.address).toBe(input.address);
  });
});
