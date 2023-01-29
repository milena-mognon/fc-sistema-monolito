import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import { ClientRepository } from "../repository/client.repository";
import { AddClientUseCase } from "../usecase/add-client/add-client.usecase";
import { ClientAdmFacade } from "./client-adm.facade";
import { FindClientUseCase } from "../usecase/find-client/find-client.usecase";
import { Client } from "../domain/client.entity";
import { Id } from "../../@shared/domain/value-object/id.value-object";
import { ClientAdmFacadeFactory } from "../factory/facade.factory";

describe("Client Adm Facade test", () => {
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

  it("should create a client", async () => {
    const facade = ClientAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "Milena",
      email: "milena@mail.com",
      address: "Address 1",
    };

    await facade.add(input);

    const client = await ClientModel.findOne({ where: { id: "1" } });

    expect(client).toBeDefined();
    expect(client.name).toBe(input.name);
    expect(client.email).toBe(input.email);
    expect(client.address).toBe(input.address);
  });

  it("should find a client", async () => {
    const input = {
      id: "1",
      name: "Client 1",
      email: "client@mail.com",
      address: "Street 1, 1111, City y",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await ClientModel.create(input);

    const facade = ClientAdmFacadeFactory.create();
    const output = await facade.find({ id: "1" });

    expect(output).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.email).toBe(input.email);
    expect(output.address).toBe(input.address);
    expect(output.createdAt).toStrictEqual(input.createdAt);
    expect(output.updatedAt).toStrictEqual(input.updatedAt);
  });
});
