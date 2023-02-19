import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Address } from "../domain/address.object-value";
import { Invoice } from "../domain/invoice.entity";
import { InvoiceGateway } from "../gateway/invoice.gateway";
import { InvoiceModel } from "./invoice.model";

export class InvoiceRepository implements InvoiceGateway {
  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({ where: { id } });
    if (!invoice) {
      throw new Error(`Invoice with id ${id} not found`);
    }
    return new Invoice({
      id: new Id(invoice.id),
      document: invoice.document,
      name: invoice.name,
      address: new Address({
        street: invoice.street,
        city: invoice.city,
        complement: invoice.complement,
        number: invoice.number,
        state: invoice.state,
        zipCode: invoice.zipCode,
      }),
      items: [],
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    });
  }
  generate(data: Invoice): Promise<Invoice> {
    throw new Error("Method not implemented.");
  }
}
