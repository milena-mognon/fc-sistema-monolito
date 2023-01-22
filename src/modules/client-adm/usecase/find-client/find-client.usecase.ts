import { UseCaseInterface } from "../../../@shared/domain/usecase/usecase.interface";
import { ClientAdmGateway } from "../../gateway/client-adm.gateway";
import {
  FindClientInputDTO,
  FindClientOutputDTO,
} from "./find-client.usecase.dto";

export class FindClientUseCase implements UseCaseInterface {
  private _clientRepository: ClientAdmGateway;

  constructor(clientRepository: ClientAdmGateway) {
    this._clientRepository = clientRepository;
  }

  async execute(input: FindClientInputDTO): Promise<FindClientOutputDTO> {
    const client = await this._clientRepository.find(input.id);

    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
}
