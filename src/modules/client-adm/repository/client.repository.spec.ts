import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import { ClientRepository } from "./client.repository";

describe("ProductRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  // it("should add a client", async () => {
  //   const input = {
  //     id: "1",
  //     name: "Client 1",
  //     email: "client@mail.com",
  //     address: "Street 1, 1111, City y",
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   };

  //   const clientRepository = new ClientRepository();

  //   const result = await clientRepository.add(input);

  //   expect(result.id.id).toBe(input.id);
  //   expect(result.name).toBe(input.name);
  //   expect(result.email).toBe(input.email);
  //   expect(result.address).toBe(input.address);
  //   expect(result.createdAt).toBe(input.createdAt);
  //   expect(result.address).toBe(input.updatedAt);
  // });

  it("should find a client", async () => {
    const client = await ClientModel.create({
      id: "1",
      name: "Client 1",
      email: "client@mail.com",
      address: "Street 1, 1111, City y",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const clientRepository = new ClientRepository();

    const result = await clientRepository.find(client.id);

    expect(result.id.id).toBe(client.id);
    expect(result.name).toBe(client.name);
    expect(result.email).toBe(client.email);
    expect(result.address).toBe(client.address);
    expect(result.createdAt).toEqual(client.createdAt);
    expect(result.updatedAt).toEqual(client.updatedAt);
  });
});
