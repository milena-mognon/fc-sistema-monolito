import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Client } from "../../domain/client.entity";
import { FindClientUseCase } from "./find-client.usecase";

const client = new Client({
  id: new Id("1"),
  name: "Client 1",
  email: "client@mail.com",
  address: "Street 1, 1111, City y",
});

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(client)),
  };
};

describe("Find Client Use Case unit test", () => {
  it("should find a client", async () => {
    const clientRepository = MockRepository();

    const findClientUseCase = new FindClientUseCase(clientRepository);

    const input = {
      id: "1",
    };
    const result = await findClientUseCase.execute(input);

    expect(clientRepository.find).toHaveBeenCalled();
    expect(result.id).toBe(client.id.id);
    expect(result.name).toBe(client.name);
    expect(result.email).toBe(client.email);
    expect(result.address).toBe(client.address);
    expect(result.createdAt).toBe(client.createdAt);
    expect(result.updatedAt).toBe(client.updatedAt);
  });
});
