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
  async generate(data: Invoice): Promise<Invoice> {
    const input = {
      id: data.id.id,
      name: data.name,
      document: data.document,
      street: data.address.street,
      number: data.address.number,
      complement: data.address.complement,
      city: data.address.city,
      state: data.address.state,
      zipCode: data.address.zipCode,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      items: data.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
    };

    await InvoiceModel.create(input, { include: ProductInvoiceModel });

    return new Invoice({
      id: new Id(input.id),
      name: input.name,
      document: input.document,
      address: new Address({
        street: input.street,
        number: input.number,
        complement: input.complement,
        zipCode: input.zipCode,
        city: input.city,
        state: input.state,
      }),
      items: input.items.map(
        (item) =>
          new Product({
            id: new Id(item.id),
            name: item.name,
            price: item.price,
          })
      ),
    });
  }
}
