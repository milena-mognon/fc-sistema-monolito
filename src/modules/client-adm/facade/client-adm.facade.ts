import { UseCaseInterface } from "../../@shared/domain/usecase/usecase.interface";
import {
  AddClientFacadeInputDTO,
  ClientAdmFacdeInterface,
  FindClientFacadeInputDTO,
  FindClientFacadeOutputDTO,
} from "./client-adm.facade.interface";

export interface UseCaseProps {
  findClientUseCase: UseCaseInterface;
  addClientUseCase: UseCaseInterface;
}
export class ClientAdmFacade implements ClientAdmFacdeInterface {
  private _findClientUseCase: UseCaseInterface;
  private _addClientUseCase: UseCaseInterface;

  constructor({ findClientUseCase, addClientUseCase }: UseCaseProps) {
    this._addClientUseCase = addClientUseCase;
    this._findClientUseCase = findClientUseCase;
  }

  async add(input: AddClientFacadeInputDTO): Promise<void> {
    await this._addClientUseCase.execute(input);
  }

  async find(
    input: FindClientFacadeInputDTO
  ): Promise<FindClientFacadeOutputDTO> {
    return await this._findClientUseCase.execute(input);
  }
}
