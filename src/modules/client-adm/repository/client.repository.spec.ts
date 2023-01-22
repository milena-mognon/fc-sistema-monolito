import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import { ClientRepository } from "./client.repository";
import { Client } from "../domain/client.entity";
import { Id } from "../../@shared/domain/value-object/id.value-object";

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

  it("should add a client", async () => {
    const input = new Client({
      id: new Id("1"),
      name: "Client 1",
      email: "client@mail.com",
      address: "Street 1, 1111, City y",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const clientRepository = new ClientRepository();

    await clientRepository.add(input);

    const clientDb = await ClientModel.findOne({ where: { id: input.id.id } });

    expect(clientDb).toBeDefined();
    expect(clientDb.id).toBe(input.id.id);
    expect(clientDb.name).toBe(input.name);
    expect(clientDb.email).toBe(input.email);
    expect(clientDb.address).toBe(input.address);
    expect(clientDb.createdAt).toEqual(input.createdAt);
    expect(clientDb.updatedAt).toEqual(input.updatedAt);
  });

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
