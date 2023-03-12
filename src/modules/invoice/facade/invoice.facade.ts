import { UseCaseInterface } from "../../@shared/domain/usecase/usecase.interface";
import {
  FindInvoiceFacadeInputDTO,
  FindInvoiceFacadeOutputDTO,
  GenerateInvoiceFacadeInputDto,
  GenerateInvoiceFacadeOutputDto,
  InvoiceFacadeInterface,
} from "./invoice.facade.interface";

export interface UseCaseProps {
  findInvoiceUseCase: UseCaseInterface;
  generateInvoiceUseCase: UseCaseInterface;
}
export class InvoiceFacade implements InvoiceFacadeInterface {
  private _findInvoiceUseCase: UseCaseInterface;
  private _generateInvoiceUseCase: UseCaseInterface;

  constructor({ findInvoiceUseCase, generateInvoiceUseCase }: UseCaseProps) {
    this._findInvoiceUseCase = findInvoiceUseCase;
    this._generateInvoiceUseCase = generateInvoiceUseCase;
  }
  async find(
    input: FindInvoiceFacadeInputDTO
  ): Promise<FindInvoiceFacadeOutputDTO> {
    return await this._findInvoiceUseCase.execute(input);
  }

  async generate(
    input: GenerateInvoiceFacadeInputDto
  ): Promise<GenerateInvoiceFacadeOutputDto> {
    return await this._generateInvoiceUseCase.execute(input);
  }
}
