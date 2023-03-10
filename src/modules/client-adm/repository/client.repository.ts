import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Client } from "../domain/client.entity";
import { ClientAdmGateway } from "../gateway/client-adm.gateway";
import { ClientModel } from "./client.model";

export class ClientRepository implements ClientAdmGateway {
  async add(client: Client): Promise<void> {
    await ClientModel.create({
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    });
  }

  async find(id: string): Promise<Client> {
    const client = await ClientModel.findOne({
      where: {
        id,
      },
    });

    if (!client) {
      throw new Error("Client Not Found");
    }

    return new Client({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    });
  }
}
