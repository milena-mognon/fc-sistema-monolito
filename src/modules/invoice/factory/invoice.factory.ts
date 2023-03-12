import { InvoiceFacade } from "../facade/invoice.facade";
import { InvoiceRepository } from "../repository/invoice.repository";
import { FindInvoiceUseCase } from "../usecase/find/find-invoice.usecase";

export class InvoiceFacadeFactory {
  static create() {
    const invoiceRepository = new InvoiceRepository();
    const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository);
    // const findClientUseCase = new FindClientUseCase(invoiceRepository);

    const invoiceFacade = new InvoiceFacade({
      findInvoiceUseCase: findInvoiceUseCase,
      generateInvoiceUseCase: undefined,
    });

    return invoiceFacade;
  }
}
