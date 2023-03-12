import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Address } from "../domain/address.object-value";
import { Invoice } from "../domain/invoice.entity";
import { Product } from "../domain/product.entity";
import { InvoiceGateway } from "../gateway/invoice.gateway";
import { InvoiceModel } from "./invoice.model";
import { ProductInvoiceModel } from "./product-invoice.model";

export class InvoiceRepository implements InvoiceGateway {
  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({
      where: { id },
      include: ProductInvoiceModel,
    });
    if (!invoice) {
      throw new Error(`Invoice with id ${id} not found`);
    }
    console.log(invoice);

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
      items: invoice.items.map((product) => {
        return new Product({
          id: new Id(product.id),
          name: product.name,
          price: product.price,
        });
      }),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    });
  }
  generate(data: Invoice): Promise<Invoice> {
    throw new Error("Method not implemented.");
  }
}
