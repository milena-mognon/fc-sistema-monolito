import { InvoiceFacade } from "../facade/invoice.facade";
import { InvoiceRepository } from "../repository/invoice.repository";
import { FindInvoiceUseCase } from "../usecase/find/find-invoice.usecase";
import { GenerateInvoiceUseCase } from "../usecase/generate/generate-invoice.usecase";

export class InvoiceFacadeFactory {
  static create() {
    const invoiceRepository = new InvoiceRepository();
    const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository);
    const generateFacadeUseCase = new GenerateInvoiceUseCase(invoiceRepository);

    const invoiceFacade = new InvoiceFacade({
      findInvoiceUseCase: findInvoiceUseCase,
      generateInvoiceUseCase: generateFacadeUseCase,
    });

    return invoiceFacade;
  }
}
