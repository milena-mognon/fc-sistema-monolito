import { UseCaseInterface } from "../../../@shared/domain/usecase/usecase.interface";
import { InvoiceGateway } from "../../gateway/invoice.gateway";
import {
  FindInvoiceUseCaseInputDTO,
  FindInvoiceUseCaseOutputDTO,
} from "./find-invoice.usecase.dto";

export class FindInvoiceUseCase implements UseCaseInterface {
  private _invoiceRepository: InvoiceGateway;

  constructor(invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = invoiceRepository;
  }

  async execute(
    input: FindInvoiceUseCaseInputDTO
  ): Promise<FindInvoiceUseCaseOutputDTO> {
    const output = await this._invoiceRepository.find(input.id);

    return {
      id: output.id.id,
      name: output.name,
      document: output.document,
      address: output.address,
      items: output.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      total: output.total(),
      createdAt: output.createdAt,
    };
  }
}
