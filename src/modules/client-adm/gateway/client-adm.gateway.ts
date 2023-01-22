import { Client } from "../domain/client.entity";

export interface ClientAdmGateway {
  add(client: Client): Promise<void>;
  find(id: string): Promise<Client>;
}
