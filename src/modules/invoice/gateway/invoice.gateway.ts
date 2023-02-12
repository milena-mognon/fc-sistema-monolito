import { Invoice } from "../domain/invoice.entity";

export interface InvoiceGateway {
  find(id: string): Promise<Invoice>;
  generate(data: Invoice): Promise<Invoice>;
}
